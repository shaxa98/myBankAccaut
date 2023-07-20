const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

app.use("/", (req, res, next) => {
  const password = req.headers.password;
  const username = req.headers.username;
  const users = JSON.parse(fs.readFileSync("./pw.json", "utf8"));

  const user = users.find((c) => c.name === username);
  if (user?.password == password) {
    next();
  } else {
    res.status(401);
    res.send("Access forbidden");
  }
});
app.use("/static", express.static("public"));

app.get("/api/accounts", (req, res) => {
  const users = JSON.parse(fs.readFileSync("./users.json", "utf8"));
  res.send(users);
});
app.get("/api/accounts/:id", (req, res) => {
  const users = JSON.parse(fs.readFileSync("./users.json", "utf8"));
  const accaunt = users.find((c) => c.id === parseInt(req.params.id));
  if (!accaunt)
    res.status(404).send("The account with the given ID was not found");
  res.send(accaunt);
});
app.get("/api/accounts/:id", (req, res) => {
  res.send(req.params.id);
});
app.post("/api/accounts", (req, res) => {
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

app.put("/api/accounts/:id", (req, res) => {
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

app.patch("/api/accounts/:id/balance", (req, res) => {
  const users = JSON.parse(fs.readFileSync("./users.json", "utf8"));
  const accauntId = parseInt(req.params.id);
  const findaccaunt = users.find((c) => c.id === accauntId);
  findaccaunt.balance = req.body.balance;
  fs.writeFileSync("./users.json", JSON.stringify(users));
  console.log(findaccaunt);
  res.json(findaccaunt);
});

app.delete("/api/accounts/:id", (req, res) => {
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

const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`Listening on port ${port}...`));
