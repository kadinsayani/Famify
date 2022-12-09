import express from "express";
import bodyParser from "body-parser";

// models
import Task from "../models/Task.model.js";

const taskRoutes = express.Router();
taskRoutes.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// todo add family
taskRoutes
  .route("/task")
  .get(userAuthenticated, (req, res) => {
    Family.findById(req.session.user.familyID, (err, family) => {
      if (err) return res.send("Error");
      if (!family) return res.send("No family found."); // should never execute

      Task.find(
        {
          _id: {
            $in: family.tasks,
          },
        },
        (err, tasks) => {
          if (err) console.log(err);
          return res.send(tasks);
        }
      );
    });
  })
  .post((req, res) => {
    const { content } = req.body;

    if (!content) {
      return res.send("Content cannot be empty.");
    } else {
      const newTask = new Task();
      newTask.content = content;
      newTask.save((err) => {
        if (err) {
          return res.send("Error on save()");
        } else {
          return res.send(newTask);
        }
      });
    }
  });

export default taskRoutes;
