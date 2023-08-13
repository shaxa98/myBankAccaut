const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     surname: {
//       type: String,
//       required: true,
//       trim: true,
//       lowercase: true,
//       index: true,
//     },
//     age: {
//       type: String,
//     },
//     email: {
//       type: String,
//       required: true,
//       lowercase: true,
//       unique: true,
//       trim: true,
//       index: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//   },
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true }, // Optional field
    surname: { type: String, required: true }, // Optional field
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User = mongoose.model("users", userSchema);
module.exports = User;
