const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

app.use(require("cors")());

app.use(express.json({ extended: true }));

app.use("/media", express.static(path.join(__dirname, "/media")));

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server Connected on PORT :", PORT);
});
