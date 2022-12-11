import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  content: String,
  family: { type: ObjectId, ref: "Family" },
  user: { type: ObjectId, ref: "User" },
  date: String,
  time: String,
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
