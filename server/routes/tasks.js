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
taskRoutes.route("/task").post((req, res) => {
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
