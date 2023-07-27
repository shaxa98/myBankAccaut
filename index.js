const express = require("express");
const fs = require("fs");
const app = express();
const router = express.Router();
app.set("view engine", "pug");
app.set("views", "./views");

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
app.use(express.static("public"));
app.use(express.static("images"));
app.use("/static", express.static("public"));

app.patch("/changePasword", (req, res) => {
  const newPw = req.body.password;
  const users = JSON.parse(fs.readFileSync("./pw.json", "utf8"));
  const user = users.find((c) => c.name == req.headers.username);
  user.password = newPw;
  fs.writeFileSync("./pw.json", JSON.stringify(users));
  res.json(`${req.headers.username} user password changed to ${newPw}`);
});

app.use("/api/accounts", require("./users/accaunts.js"));

app.get("/first_template", function (req, res) {
  res.render("first_view");
});

const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`Listening on port ${port}...`));
