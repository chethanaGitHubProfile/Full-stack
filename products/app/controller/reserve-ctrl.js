const { validationResult } = require("express-validator");
const Reserve = require("../models/reserve-model");
const Product = require("../models/product-model");
const { format } = require("date-fns");
const cron = require("node-cron");
const _ = require("lodash");
// const moment = require("moment");
const { DateTime } = require("luxon");
const { productId } = require("../validations/grn-validation");
const reserveCtrl = {};

reserveCtrl.list = async (req, res) => {
  try {
    const reserve = await Reserve.find();
    return res.status(200).json(reserve);
  } catch (error) {
    return res.status(500).json(error);
  }
};

reserveCtrl.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { productId, reserveQuantity } = req.body;

    // Find the product based on productId to get product name
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const existingReservations = await Reserve.find({
      productId,
      status: { $in: ["Pending", "Started"] },
    });

    if (existingReservations.length > 0) {
      return res
        .status(400)
        .json({ error: "There are active reservations for this product." });
    }

    const { startDate, startTime, endDate, endTime, ...rest } = req.body;

    const combinedStartDate = new Date(`${startDate}T${startTime}`);
    const combinedEndDate = new Date(`${endDate}T${endTime}`);

    const reserve = new Reserve({
      ...rest,
      // productId: {},
      startDate: combinedStartDate,
      endDate: combinedEndDate,
    });

    await reserve.save();

    // Schedule the cron job to update reservation statuses
    const updateReservationStatus = async () => {
      try {
        // Find reservations that are still in "Pending" status and have a start date in the past
        const pendingReservations = await Reserve.find({
          status: "Pending",
          startDate: { $lte: new Date() },
        });

        // Update status of pending reservations to "Started"
        await Promise.all(
          pendingReservations.map(async (reservation) => {
            reservation.status = "Started";
            await reservation.save();

            // Increment product stock only when the reservation status is "Started"
            const product = await Product.findByIdAndUpdate(
              productId,
              {
                $inc: {
                  reserveStock: reservation.reserveQuantity,
                  stock: reservation.reserveQuantity,
                },
              },
              { new: true }
            );
            reservation.productId = product;
            reservation.productId = product.name;
          })
        );

        // Find reservations that are still in "Started" status and have an end date in the past
        const startedReservations = await Reserve.find({
          status: "Started",
          endDate: { $lt: new Date() },
        });

        // Update status of reservations with passed end date to "Ended"
        await Promise.all(
          startedReservations.map(async (reservation) => {
            if (new Date(reservation.endDate) <= new Date()) {
              reservation.status = "Ended";
              await reservation.save();
              // Increment product stock only when the reservation status is "Started"
              const product = await Product.findByIdAndUpdate(
                productId,
                {
                  $inc: {
                    reserveStock: -reservation.reserveQuantity,
                    stock: -reservation.reserveQuantity,
                  },
                },
                { new: true }
              );
              reservation.productId = product;
              reservation.productId = product.name;

              // Set reserveQuantity to zero once the reservation ends
              reservation.reserveQuantity = 0;
              await reservation.save();
            }
          })
        );
      } catch (error) {
        console.log("Error updating reservation status ", error);
      }
    };

    // Schedule the cron job to run every minute
    cron.schedule(
      "*/1 * * * *",
      async () => {
        await updateReservationStatus();
      },
      {
        scheduled: true,
        timezone: "Asia/Kolkata",
      }
    );

    return res.status(200).json(reserve);
  } catch (err) {
    console.log("Error in creating reserve", err);
    return res.status(500).json("Internal server error");
  }
};

reserveCtrl.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const id = req.params.id;
    const body = _.pick(req.body, ["reserveQuantity"]);
    const reserve = await Reserve.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });

    const { productId, reserveQuantity } = req.body;
    const product = await Product.findOneAndUpdate(
      productId,
      { reserveStock: reserveQuantity },
      { new: true }
    );
    reserve.product = product;
    //console.log(reserve);
    res.json(reserve);
  } catch (err) {
    res.json(err);
  }
};

reserveCtrl.reserveQuantity = async (req, res) => {
  const { productId } = req.params;
  const updates = req.body;
  try {
    const product = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.log("error");
    return res.status(500).json({ error: "Internal server error" });
  }
};

reserveCtrl.softDelete = async (req, res) => {
  const id = req.params.id;
  try {
    const reserve = await Reserve.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        deletedAt: new Date(),
        status: "Stopped",
      },
      { new: true }
    );

    if (!reserve) {
      return res.status(400).json({ message: "Given Reserve Id not found" });
    }

    //fetching productId from reserve object
    const productId = reserve.productId;
    //console.log(productId);
    const product = await Product.findOneAndUpdate(
      productId,
      { reserveStock: 0 },
      { new: true }
    );
    //console.log(product);

    reserve.product = product;
    const filterReserve = {
      _id: reserve._id,
      isDeleted: reserve.isDeleted,
      status: reserve.status,
      productId: reserve.productId,
    };
    res.json(filterReserve);
  } catch (err) {
    res.json(err);
  }
};

reserveCtrl.ended = async (req, res) => {
  const id = req.params.id;
  try {
    const reserve = await Reserve.findByIdAndUpdate(
      id,
      { status: "Ended" },
      { new: true }
    );
    if (!reserve) {
      return res.status(400).json({ message: "Given Reserve Id not found" });
    }
    const check =
      format(new Date(reserve.endDate), "dd/MM/yyyy") >=
      format(new Date(), "dd/MM/yyyy");
    if (check) {
      reserve.status = "Started";
    } else {
      reserve.status = "Ended";
    }

    //make reserveStock from product object to Zero
    //find productId from reserve object
    const productId = reserve.productId;

    //now make that producId of that reserve Id to Zero
    const product = await Product.findOneAndUpdate(
      productId,
      { reserveStock: 0 },
      { new: true }
    );
    reserve.product = product;

    const filterReserve = {
      _id: reserve.productId,
      status: reserve.status,
      isDeleted: reserve.isDeleted,
      productId: reserve.productId,
    };
    res.status(200).json(filterReserve);
  } catch (err) {
    res.json(err);
  }
};
module.exports = reserveCtrl;
