const express = require("express");
const fs = require("fs");
const router = express.Router();
router.get("/", (req, res) => {
  const users = JSON.parse(fs.readFileSync("./users.json", "utf8"));
  res.send(users);
});
router.get("/:id", (req, res) => {
  const users = JSON.parse(fs.readFileSync("./users.json", "utf8"));
  const accaunt = users.find((c) => c.id === parseInt(req.params.id));
  if (!accaunt)
    res.status(404).send("The account with the given ID was not found");
  res.send(accaunt);
});
router.get("/:id", (req, res) => {
  res.send(req.params.id);
});
router.post("/", (req, res) => {
  const users = JSON.parse(fs.readFileSync("./users.json", "utf8"));
  if (!req.body || req.body.name.length < 3) {
    res
      .status(400)
      .send("Name is required and should be minimum 3 characters. ");
    return;
  }
  console.log(req.body);
  let accaunt = {
    id: users.length + 1,
    name: req.body.name,
    balance: req.body.balance,
  };
  users.push(accaunt);
  fs.writeFileSync("./users.json", JSON.stringify(users));
  res.send(users);
});

router.put("/:id", (req, res) => {
  const users = JSON.parse(fs.readFileSync("./users.json", "utf8"));

  const accauntId = req.params.id;
  const updatedData = req.body;

  const updatedaccaunt = {
    id: accauntId,
    ...updatedData,
  };
  users.push(updatedaccaunt);
  res.json(updatedaccaunt);
});

router.patch("/:id/balance", (req, res) => {
  const users = JSON.parse(fs.readFileSync("./users.json", "utf8"));
  const accauntId = parseInt(req.params.id);
  const findaccaunt = users.find((c) => c.id === accauntId);
  findaccaunt.balance = req.body.balance;
  fs.writeFileSync("./users.json", JSON.stringify(users));
  console.log(findaccaunt);
  res.json(findaccaunt);
});

router.delete("/:id", (req, res) => {
  const users = JSON.parse(fs.readFileSync("./users.json", "utf8"));
  const accauntId = Number(req.params.id);
  const accauntIndex = users.findIndex((accaunt) => accaunt.id === accauntId);

  if (accauntIndex !== -1) {
    const deletedusers = users.splice(accauntIndex, 1);
    fs.writeFileSync("./users.json", JSON.stringify(users));
    res.send(deletedusers);
  } else {
    res.status(404).json({ error: "accaunt not found" });
  }
  j;
});

module.exports = router;
