const Category = require("../models/category-model");
//const Brand = require("../models/brand-model");
const { validationResult } = require("express-validator");
const slugfiy = require("slugify");
const categoryCtrl = {};

categoryCtrl.list = async (req, res) => {
  try {
    const category = await Category.find();
    res.json(category);
  } catch (err) {
    res.json(err);
  }
};

//Create
categoryCtrl.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const body = req.body;
  //console.log("cat", body);
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).json({ message: "Name is required" });
    }

    //check existing category
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res
        .status(200)
        .json({ success: true, message: "Catgeory already Exists" });
    }
    const category = new Category({ name, slug: slugfiy(name) });
    //console.log(category);

    //console.log(body)
    // const file = req.file
    // //console.log(file)
    // if(!file)
    // {
    //     return res.status(401).json({errors : "No file uploaded"})
    // }
    // const imagePath = file.path
    // //console.log(imagePath)
    // body.imagePath = imagePath

    // category.BrandId = req.body.BrandId;
    //console.log(category.BrandId)
    await category.save();
    //console.log(category)
    return res.json({
      success: true,
      message: "Category Created ",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(201).json({
      success: false,
      error,
      message: "Error in creating Category",
    });
  }
};

//Update
categoryCtrl.update = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id", id);
    const { name, ...otherFields } = req.body;
    console.log("body", req.body);
    const updateObject = { ...otherFields };
    const category = await Category.findByIdAndUpdate(id, updateObject, {
      new: true,
    });
    console.log(category);
    category.name = name;
    await category.save();
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    // console.log(err);
    res.status(500).json({
      success: false,
      error,
    });
  }
};

//Delete
categoryCtrl.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findByIdAndDelete(id);
    res.json(category);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

categoryCtrl.single = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findOne(id);
    console.log("catgeory");
    return res.status(200).json({
      success: true,
      message: "Get single category successful",
      category,
    });
  } catch (error) {
    // conosle.log(error);
    res.status(500).json({
      success: false,
      error,
      message: "Error in fetching single catgeory",
    });
  }
};
module.exports = categoryCtrl;
