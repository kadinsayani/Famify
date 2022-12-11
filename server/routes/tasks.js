import express from "express";
import bodyParser from "body-parser";
import userAuthenticated from "../auth/Authentication.js";

import Task from "../models/Task.model.js";
import Family from "../models/Family.model.js";
import User from "../models/User.model.js";

const taskRoutes = express.Router();
taskRoutes.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

class TaskView {
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

taskRoutes
  .route("/tasks")
  .get(userAuthenticated, (req, res) => {
    Family.findById(req.session.user.familyID, (err, family) => {
      if (err) return res.status(500).send("Error");
      if (!family) return res.status(404).send(); // should never execute

      Task.find(
        {
          _id: {
            $in: family.tasks,
          },
        },
        (err, tasks) => {
          if (err) console.log(err);

          const userIDs = tasks.map((task) => task.user);

          User.find(
            {
              _id: { $in: userIDs },
            },
            (err, users) => {
              const toSend = [];

              for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].user) {
                  for (let j = 0; j < users.length; j++) {
                    if (tasks[i].user.toString() === users[j]._id.toString()) {
                      toSend.push(
                        new TaskView(
                          tasks[i]._id,
                          tasks[i].content,
                          users[j].username,
                          tasks[i].date,
                          tasks[i].time
                        )
                      );
                    }
                  }
                } else {
                  toSend.push(
                    new TaskView(
                      tasks[i]._id,
                      tasks[i].content,
                      null,
                      tasks[i].date,
                      tasks[i].time
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

    const newTask = new Task({
      content: content,
      family: family,
      user: user,
      date: date,
      time: time,
    });

    Family.findById(family, (err, family) => {
      if (err) return res.status(500).send(err);
      if (!family) return res.status(404).send();

      family.tasks.push(newTask._id);
      family.save();
    });

    newTask.content = content;
    newTask.save((err) => {
      if (err) {
        return res.status(500).send("Error on save()");
      } else {
        return res.send(newTask);
      }
    });
  });

// :id

taskRoutes.route("/tasks/:id").delete(userAuthenticated, (req, res) => {
  Task.findById(req.params.id, (err, task) => {
    if (err) return res.send("An error occured.");
    if (!task) return res.status(404).send();

    if (task.user.toString() === req.session.user.id.toString()) {
      Task.findByIdAndDelete(req.params.id, (err, task) => {
        if (err) return res.status(500).send();

        return res.status(200).send();
      });
    } else {
      return res.status(403).send();
    }
  });
});

export default taskRoutes;
