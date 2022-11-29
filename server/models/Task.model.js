import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  content: String,
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
