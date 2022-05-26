require("dotenv").config();
const connectDb = require("./db/db");
const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const usersRouter = require("./routes/users");
const contractorsRouter = require("./routes/contractors");
const messagesRouter = require("./routes/messages");
const reviewsRouter = require("./routes/reviews");
const categoriesRouter = require("./routes/categories");

connectDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use("/api/users", usersRouter);
app.use("/api/contractors", contractorsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/categories", categoriesRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
