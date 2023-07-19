const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());
const users = JSON.parse(fs.readFileSync("./user.json", "utf8"));
console.log(users);

const accaunts = [
  { id: 1, name: "Shaxzod", balance: 150 },
  { id: 2, name: "Begzod", balance: 200 },
  { id: 3, name: "Jonibek", balance: 350 },
  { id: 4, name: "Daler", balance: 450 },
  { id: 5, name: "Bobur", balance: 550 },
];

app.get("/api/accaunts", (req, res) => {
  res.send(accaunts);
});
app.get("/api/accaunts/:id", (req, res) => {
  const accaunt = accaunts.find((c) => c.id === parseInt(req.params.id));
  if (!accaunt)
    res.status(404).send("The account with the given ID was not found");
  res.send(accaunt);
});
app.get("/api/accaunts/:id", (req, res) => {
  res.send(req.params.id);
});
app.post("/api/accaunts", (req, res) => {
  if (!req.body || req.body.name.length < 3) {
    res
      .status(400)
      .send("Name is required and should be minimum 3 characters. ");
    return;
  }
  console.log(req.body);
  let accaunt = {
    id: accaunts.length + 1,
    name: req.body.name,
    balance: req.body.balance,
  };
  accaunts.push(accaunt);
  res.send(accaunts);
});

app.put("/api/accaunts/:id", (req, res) => {
  const accauntId = req.params.id;
  const updatedData = req.body;

  const updatedaccaunt = {
    id: accauntId,
    ...updatedData,
  };
  accaunts.push(updatedaccaunt);
  res.json(updatedaccaunt);
});

app.patch("/api/accaunts/:id/balance", (req, res) => {
  const accauntId = parseInt(req.params.id);
  const findaccaunt = accaunts.find((c) => c.id === accauntId);
  findaccaunt.balance = req.body.balance;
  console.log(findaccaunt);
  res.json(findaccaunt);
});

app.delete("/api/accaunts/:id", (req, res) => {
  const accauntId = Number(req.params.id);
  const accauntIndex = accaunts.findIndex(
    (accaunt) => accaunt.id === accauntId
  );

  if (accauntIndex !== -1) {
    const deletedaccaunt = accaunts.splice(accauntIndex, 1);
    res.json(deletedaccaunt);
  } else {
    res.status(404).json({ error: "accaunt not found" });
  }
});

const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`Listening on port ${port}...`));
