// const cron = require("node-cron");
// const Reserve = require("../models/reserve-model");
// const Product = require("../models/product-model");
// const { format } = require("date-fns");

// cron.schedule("1 * * * * *", async () => {
//   console.log("seconds");
//   try {
//     const reservations = await Reserve.find({ status: "Started" });
//     for (const reservation of reservations) {
//       if (
//         format(new Date(reservation.endDate), "dd/MM/yyyy") <
//         format(new Date(), "dd/MM/yyyy")
//       ) {
//         reservation.status = "Ended";
//         await reservation.save();
//       }

//       //Make reserveStock from product Object to Zero for reservations that ended
//       const endedReservations = await Reserve.find({ status: "Ended" });
//       for (const reservation of endedReservations) {
//         const productId = reservation.productId;
//         const product = await Product.findOneAndUpdate(
//           productId,
//           { reserveStock: 0 },
//           { new: true }
//         );
//         reservation.product = product;
//         await reservation.save();
//         console.log("Cron job executed successfully");
//       }
//     }
//   } catch (err) {
//     console.log("error occured during cron job", err);
//   }
// });
