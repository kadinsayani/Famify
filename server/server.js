import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// dotenv
import * as dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

// models
import User from "./models/User.model.js";
import Family from "./models/Family.model.js";

const port = process.env.FAMIFY_SERVER_PORT || 5000;
const atlasURI = process.env.ATLAS_URI;

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
      console.log("Successfully connected to MongoDB.");
    } else {
      console.log(err);
    }
  }
);

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

  const { username, joinCode, password } = req.body;

  if (!username || !password) {
    return res.send("One or more required fields missing.");
  }

  User.findOne({username: username}, (err, user) => {

    if (err) {
      return res.send(err);
    }

    if (user) {
      return res.send("Username already exists.");
    }

    if (joinCode) {
      // user to join family

      Family.findOne({joinCode: joinCode}, (err, family) => {

        if (err) {
          return res.send(err);
        }

        if (!family) {
          return res.send("Join code invalid.");
        } else {

          const user = new User({username: username, password: password, family: family._id});
          family.members.push(user._id);
          family.save()
          user.save((err) => {
            if (err) {
              return res.send(err);
            } else {
              return res.status(200).send(user);
            }
          })

        }

      })

    } else {
      // user to create family

      const family = new Family();
      // code generation
      // TODO: actual unique code generation algorithm
      let familyID = family._id.toString();
      let code = familyID.substring(familyID.length - 6);

      family.joinCode = code;

      const user = new User({username: username, password: password, family: family._id});

      family.members.push(user._id);

      family.save()
      user.save((err) => {
        if (err) {
          return res.send(err);
        } else {
          return res.status(200).send(user);
        }
      })
    }

  })

});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
