const express = require("express");
const router = express.Router();
const User = require("../models/user-module");
// login, emailki password mibiyod tekshiri kadan darkor
router.post("/login", async (res, req, next) => {
  try {
    const users = await User.create(req.body);
    console.log(users);
    res.status(200).json(login);
  } catch (error) {
    next(error);
  }
});
//register
router.post("/register", () => {});
//change password
router.patch("/password", () => {});
module.exports = router;
