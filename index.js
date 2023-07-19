const express = require("express");
const app = express();

app.use(express.json());

const accaunts = [
  { id: 1, name: "Shaxzod", money: 150 },
  { id: 2, name: "Begzod", money: 200 },
  { id: 3, name: "Jonibek", money: 350 },
  { id: 4, name: "Daler", money: 450 },
  { id: 5, name: "Bobur", money: 550 },
];
app.get("/api/shaxzod", (req, res) => {
  res.send("Hello I am Shaxzod api");
});
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
    money: req.body.money,
  };
  accaunts.push(accaunt);
  res.send(accaunt);
});

app.put("/api/accaunts/:id", (req, res) => {
  const accauntId = req.params.id;
  const updatedData = req.body;

  const updatedaccaunt = {
    id: accauntId,
    ...updatedData,
  };

  res.json(updatedaccaunt);
});

app.patch("/api/accaunts/:id", (req, res) => {
  const accauntId = req.params.id;
  const updatedData = req.body;

  const updatedaccaunt = {
    id: accauntId,
    ...updatedData,
  };

  res.json(updatedaccaunt);
});

app.delete("/api/accaunts/:id", (req, res) => {
  const accauntId = Number(req.params.id);

  // Find the index of the accaunt with the provided ID
  const accauntIndex = accaunts.findIndex(
    (accaunt) => accaunt.id === accauntId
  );

  // Check if the accaunt exists
  if (accauntIndex !== -1) {
    // Remove the accaunt from the accaunts array
    const deletedaccaunt = accaunts.splice(accauntIndex, 1);
    res.json(deletedaccaunt);
  } else {
    res.status(404).json({ error: "accaunt not found" });
  }
});

const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`Listening on port ${port}...`));
