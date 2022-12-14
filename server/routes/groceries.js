import express from "express";
import bodyParser from "body-parser";
import userAuthenticated from "../auth/Authentication.js";

import Grocery from "../models/Grocery.model.js";
import Family from "../models/Family.model.js";
import User from "../models/User.model.js";

const groceryRoutes = express.Router();
groceryRoutes.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

class GroceryView {
  constructor(_id, content, user, date, time, isCompleted) {
    this._id = _id ? _id : null;
    this.content = content ? content : null;
    this.user = user ? user : null;
    this.date = date ? date : null;
    this.time = time ? time : null;
    this.isCompleted = isCompleted ? isCompleted : null;
  }
}

// routes

groceryRoutes
  .route("/groceries")
  .get(userAuthenticated, (req, res) => {
    Family.findById(req.session.user.familyID, (err, family) => {
      if (err) return res.status(500).send("Error");
      if (!family) return res.status(404).send(); // should never execute

      Grocery.find(
        {
          _id: {
            $in: family.groceries,
          },
        },
        (err, groceries) => {
          if (err) console.log(err);

          const userIDs = groceries.map((grocery) => grocery.user);

          User.find(
            {
              _id: { $in: userIDs },
            },
            (err, users) => {
              const toSend = [];

              for (let i = 0; i < groceries.length; i++) {
                if (groceries[i].user) {
                  for (let j = 0; j < users.length; j++) {
                    if (
                      groceries[i].user.toString() === users[j]._id.toString()
                    ) {
                      toSend.push(
                        new GroceryView(
                          groceries[i]._id,
                          groceries[i].content,
                          users[j].username,
                          groceries[i].date,
                          groceries[i].time
                        )
                      );
                    }
                  }
                } else {
                  toSend.push(
                    new GroceryView(
                      groceries[i]._id,
                      groceries[i].content,
                      null,
                      groceries[i].date,
                      groceries[i].time
                    )
                  );
                }
              }

              return res.send(toSend);
            }
          );
        }
      );
    });
  })
  .post(userAuthenticated, (req, res) => {
    const content = req.body.content;
    const family = req.session.user.familyID;
    const user = req.session.user.id;

    const today = new Date();
    const date = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const time = today.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    if (!content) return res.status(400).send("Content cannot be empty.");

    const newGrocery = new Grocery({
      content: content,
      family: family,
      user: user,
      date: date,
      time: time,
    });

    Family.findById(family, (err, family) => {
      if (err) return res.status(500).send(err);
      if (!family) return res.status(404).send();

      family.groceries.push(newGrocery._id);
      family.save();
    });

    newGrocery.content = content;
    newGrocery.save((err) => {
      if (err) {
        return res.status(500).send("Error on save()");
      } else {
        return res.send(newGrocery);
      }
    });
  });

// :id

groceryRoutes.route("/groceries/:id").delete(userAuthenticated, (req, res) => {
  if (req.session.user.familyID !== req.item.familyID) {
    return res
      .status(401)
      .send("Unauthorized: you are not a member of this family");
  }
  Grocery.findById(req.params.id, (err, grocery) => {
    if (err) return res.send("An error occured.");
    if (!grocery) return res.status(404).send();

    if (grocery.user.toString() === req.session.user.id.toString()) {
      Grocery.findByIdAndDelete(req.params.id, (err, grocery) => {
        if (err) return res.status(500).send();

        return res.status(200).send();
      });
    } else {
      return res.status(403).send();
    }
  });
});

export default groceryRoutes;
