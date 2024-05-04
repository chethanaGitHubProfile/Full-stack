const { validationResult } = require("express-validator");
const Brand = require("../models/brand-model");
const _ = require("lodash");
const brandCtrl = {};

//List
brandCtrl.list = async (req, res) => {
  try {
    const brand = await Brand.find();
    console.log(brand);
    res.json(brand);
  } catch (err) {
    res.status(500).json("Internal server error");
  }
};

//Create
brandCtrl.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }
  try {
    const body = _.pick(req.body, [
      "name",
      "description",
      //   "status",
      //   "imagePath",
    ]);
    console.log(body);
    // const file = req.file
    // //console.log(file)
    // if(!file)
    // {
    //     return res.status(401).json({errors : "file not uploaded"})
    // }
    // const imagePath = file.path
    // console.log(imagePath)
    // body.imagePath = imagePath
    const brand = new Brand(body);
    await brand.save();
    res.json(brand);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal server error");
  }
};

//update
brandCtrl.update = async (req, res) => {
  const id = req.params.id;
  //console.log(id)
  const body = req.body;
  //console.log(body)
  const file = req.file;
  //console.log(file)
  if (!file) {
    res.status(401).json({ errors: "file not uploaded" });
  }
  try {
    const imagePath = file.path;
    //console.log(imagePath)
    const brand = await Brand.findByIdAndUpdate(
      id,
      body,
      (Brand.imagePath = req.images.filename),
      { new: true, runValidator: true }
    );

    // Update brand data including the image path
    /*brand.set({
            ...body,imagePath
        })*/
    await brand.save();
    console.log(brand);
    res.json(brand);
  } catch (err) {
    res.json(err);
  }
};

//delete
brandCtrl.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const brand = await Brand.findByIdAndDelete(id);
    res.json(brand);
  } catch (err) {
    res.json(err);
  }
};
module.exports = brandCtrl;
