const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());
const users = JSON.parse(fs.readFileSync("./user.json", "utf8"));

app.get("/api/accaunts", (req, res) => {
  const users = JSON.parse(fs.readFileSync("./user.json", "utf8"));
  res.send(users);
});
app.get("/api/accaunts/:id", (req, res) => {
  const users = JSON.parse(fs.readFileSync("./user.json", "utf8"));
  const accaunt = users.find((c) => c.id === parseInt(req.params.id));
  if (!accaunt)
    res.status(404).send("The account with the given ID was not found");
  res.send(accaunt);
});
app.get("/api/accaunts/:id", (req, res) => {
  res.send(req.params.id);
});
app.post("/api/accaunts", (req, res) => {
  const users = JSON.parse(fs.readFileSync("./user.json", "utf8"));
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
  res.send(users);
});

app.put("/api/accaunts/:id", (req, res) => {
  const users = JSON.parse(fs.readFileSync("./user.json", "utf8"));
  const accauntId = req.params.id;
  const updatedData = req.body;

  const updatedaccaunt = {
    id: accauntId,
    ...updatedData,
  };
  users.push(updatedaccaunt);
  res.json(updatedaccaunt);
});

app.patch("/api/accaunts/:id/balance", (req, res) => {
  const users = JSON.parse(fs.readFileSync("./user.json", "utf8"));
  const accauntId = parseInt(req.params.id);
  const findaccaunt = users.find((c) => c.id === accauntId);
  findaccaunt.balance = req.body.balance;
  console.log(findaccaunt);
  res.json(findaccaunt);
});

app.delete("/api/accaunts/:id", (req, res) => {
  const users = JSON.parse(fs.readFileSync("./user.json", "utf8"));
  const accauntId = Number(req.params.id);
  const accauntIndex = users.findIndex((accaunt) => accaunt.id === accauntId);

  if (accauntIndex !== -1) {
    const deletedaccaunt = accaunts.splice(accauntIndex, 1);
    res.json(deletedaccaunt);
  } else {
    res.status(404).json({ error: "accaunt not found" });
  }
});

const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`Listening on port ${port}...`));
