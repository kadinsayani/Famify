import express from "express"
import bodyParser from "body-parser"

// use to check for authentication
import userAuthenticated from "../auth/Authentication.js";

// models
import Family from "../models/Family.model.js";
import User from "../models/User.model.js"

const userRoutes = express.Router();

userRoutes.use(bodyParser.urlencoded({
  extended: true
}));

// get current user
userRoutes.route("/user")
    .get(userAuthenticated, (req, res) => {
      return res.send(req.session.user);
  });

// get family
userRoutes.route("/user/family")
  .get(userAuthenticated, (req, res) => {

    Family.findById(req.session.user.familyID, (err, family) => {
      if (err) return res.status(500).send("An error occured.")
      if (!family) return res.send("No family found.")
      res.send(family)
    })
});

userRoutes.route("/user/family/members")
  .get(userAuthenticated, (req, res) => {
    Family.findById(req.session.user.familyID, (err, family) => {
      if (err) return res.status(500).send("An error occured.")
      if (!family) return res.send("No family found.")

      User.find({
        '_id': { $in: family.members }
      }, (err, users) => {
        if (err) return res.status(500).send("An error occured.")
        if (!users) return res.status(404).send()

        return res.send(users)
      })
    })
  })

userRoutes.route("/user/status")
  .put(userAuthenticated, (req, res) => {

    User.findByIdAndUpdate(req.session.user.id, {status: req.body.content}, {new: true}, (err, user) => {
      req.session.user.status = user.status
      return res.send(req.session.user)
    })

  })

// get one user by id
userRoutes.route("/deprecated/user/:id")

  // get one user
  .get(userAuthenticated, (req, res) => {
    
    const familyID = req.session.user.familyID

    // find ID in family
    Family.findById(familyID, (err, family) => {

      if (err) return res.send("An error occured.")
      if (!family) return res.send("Not found.")

      // if member being searched is in the same family
      if (family.members.some(i => i.toString() === req.params.id.toString())) {

        User.findById(req.params.id, (err, user) => {

          if (err) return res.send("An error occured.")
          if (!user) {
            return res.status(404).send({
              status: 404,
              message: "User not found."
            })
          }

          return res.send(user)

        })

      } else {
        return res.status(404).send({
          status: 404,
          message: "User not found."
        })
      }
    })

  })

export default userRoutes;
