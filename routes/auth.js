const express = require("express");
const router = express.Router();
const User = require("../models/user-module");

// login, emailki password mibiyod tekshiri kadan darkor
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      if (user.password === password) {
        res.json({ message: "Login successful!" });
      } else {
        res
          .status(401)
          .json({ error: "Incorrect password. Please try again." });
      }
    } else {
      res
        .status(404)
        .json({ error: "User not found. Please check your email." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});
//register

router.post("/register", async (req, res) => {
  const { email, password, name, surname } = req.body; // Extract name and surname

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).json({ error: "User with this email already exists." });
    } else {
      const newUser = new User({ email, password, name, surname }); // Include name and surname
      await newUser.save();
      res.json({ message: "Registration successful!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
});
// baroyi kor farmidan postmana bodyashba menavestagi kod
// {
//   "email": "user@example.com",
//   "password": "secretpassword",
//   "name": "John",
//   "surname": "Doe"
// }

//change password

router.patch("/password", async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res
        .status(404)
        .json({ error: "User not found. Please check your email." });
    } else {
      if (user.password !== currentPassword) {
        res.status(401).json({ error: "Incorrect current password." });
      } else {
        user.password = newPassword;
        await user.save();
        res.json({ message: "Password changed successfully!" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});
// baroyi kor farmidan postmana bodyashba menavestagi kod
//
// {
//   "email": "user@example.com",
//   "currentPassword": "oldPassword",
//   "newPassword": "newPassword"
// }
module.exports = router;
