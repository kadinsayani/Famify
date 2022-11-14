import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// const express = require("express");
// const app = express();
// const cors = require("cors");
//require("dotenv").config({ path: "./config.env" });
const port = 5000;
// app.use(cors());
// app.use(express.json());
// app.use(require("./routes/users"));
// app.use(require("./routes/families"));
// // get driver connection
// const dbo = require("./db/conn");

// app.listen(port, () => {
//   // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);
//   });
//   console.log(`Server is running on port: ${port}`);
// });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
  "mongodb+srv://Cluster96109:bVd3aF9mTXhO@cluster96109.2znr6fz.mongodb.net",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to MongoDB");
});


const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

app.post("/Login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }, (err, user) => {
    if (user) {
      if (user.password === password) {
        res.send("Success");
      } else {
        res.send("Wrong password");
      }
    } else {
      res.send("User not found");
    }
  });
});

app.post("/Register", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  User.findOne({ username: username }, (err, user) => {
    if (user) {
      res.send("User already exists");
    } else {
      const user = new User({ username, password });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send("Success");
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
