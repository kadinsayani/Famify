import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// dotenv
import * as dotenv from 'dotenv'
dotenv.config({ path: "./config.env" });

const port = process.env.FAMIFY_SERVER_PORT || 5000;
const atlasURI = process.env.ATLAS_URI

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
  atlasURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("Successfully connected to MongoDB.")
    }
  }
);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

app.post("/login", (req, res) => {
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

app.post("/register", (req, res) => {
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
