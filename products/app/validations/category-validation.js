const Category = require("../models/category-model");
const categorySchema = {
  name: {
    notEmpty: {
      errorMessage: "catgeory is required",
    },
    trim: true,
  },
  // BrandId :{
  //     in : ['body']
  // },
  // imagePath : String
};
module.exports = categorySchema;
