const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middleware/authentication");
// router.use(authMiddleware);
const User = require("../models/user-module");

const getUsers = async (req, res) => {
  console.log("getUsers: ");
  const users = await User.find();
  // const users = JSON.parse(fs.readFileSync("./users.json", "utf8"));
  res.send(users); // kill call
};
router.get("/", getUsers);

// router.get("/users/:userId", function (req, res) {
//   const userId = +req.params.userId;
//   const users = JSON.parse(fs.readFileSync("./users.json", "utf8"));
//   const user = users.find((user) => user.id === userId);
//   res.send(user);
// });

// router.get("/users/:userId/balance", (req, res) => {
//   const userId = +req.params.userId;
//   const users = JSON.parse(fs.readFileSync("./users.json", "utf8"));
//   const user = users.find((user) => user.id === userId);
//   res.send(`${user.balance}`);
//   // db.find("user")
// });

// router.post("/", async (req, res, next) => {
//   // const newUser = req.body;
//   // users.push(newUser);
//   // const users = JSON.parse(fs.readFileSync("./users.json", "utf8"));
//   // users.push(newUser);
//   // fs.writeFileSync("./users.json", JSON.stringify({}));
//   try {
//     //
//     const user = new User(req.body);
//     await user.save(); // request mongo  - 1
//     res.send("Success"); // 2
//   } catch (error) {
//     next(error);
//   }
//   // 1+1 - sync operation
//   // get/fetch data from server  - async operation
// });

// router.patch("/age/:name", async (req, res) => {
//   try {
//     await User.findOneAndUpdate(
//       { name: req.params.name },
//       { age: req.body.age }
//     );
//     res.send("Success");
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.patch("/users/:userId/balance", (req, res) => {
//   const userId = +req.params.userId;
//   const users = JSON.parse(fs.readFileSync("./users.json", "utf8"));
//   const user = users.find((user) => user.id === userId);
//   const { balance } = req.body;
//   user.balance = balance;
//   fs.writeFileSync("./users.json", JSON.stringify(users));
//   res.send("Success");
// });

// router.delete("/users/:userId", (req, res) => {
//   const userId = +req.params.userId;
//   const users = JSON.parse(fs.readFileSync("./users.json", "utf8"));
//   const userIndex = users.findIndex((user) => user.id === userId);
//   users.splice(userIndex, 1);
//   fs.writeFileSync("./users.json", JSON.stringify(users));
//   res.send("Success");
// });

///

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//routes

router.get("/", (req, res) => {
  res.send("Hello NODE API");
});

router.get("/blog", (req, res) => {
  res.send("Hello Blog, My name is Devtamin");
});

router.get("/Users", async (req, res) => {
  try {
    const Users = await User.find({});
    res.status(200).json(Users);
  } catch (error) {
    next(error);
  }
});

router.get("/Users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const User = await User.findById(id);
    res.status(200).json(User);
  } catch (error) {
    next(error);
  }
});

router.post("/Users", async (req, res) => {
  try {
    const User = await User.create(req.body);
    res.status(200).json(User);
  } catch (error) {
    next(error);
  }
});

// update a User
router.put("/Users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const User = await User.findByIdAndUpdate(id, req.body);
    // we cannot find any User in database
    if (!User) {
      return res
        .status(404)
        .json({ message: `cannot find any User with ID ${id}` });
    }
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// delete a User

router.delete("/Users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const User = await User.findByIdAndDelete(id);
    if (!User) {
      return res
        .status(404)
        .json({ message: `cannot find any User with ID ${id}` });
    }
    res.status(200).json(User);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
