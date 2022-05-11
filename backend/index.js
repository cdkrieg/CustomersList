require("dotenv").config();
const connectDb = require("./db/db");
const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path");

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads/images", express.static(path.join("uploads", "images")));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
