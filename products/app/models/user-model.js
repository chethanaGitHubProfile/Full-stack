const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  mobileNumber: String,
  role: String,
});
const User = model("User", userSchema);

module.exports = User;

/*const mongoose = require("mongoose");
const { model, Schema } = mongoose;

userSchema = new Schema(
  {
    userName: String,
    companyName: String,
    email: String,
    mobileNo: Number,
    password: String,
    role: {
      type: String,
      enum: ["admin", "retailer", "employee"],
    },
    /* verified: {
      type: Boolean,
      default: function () {
        return this.role === "employee" ? false : true;
      },
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
*/
