import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  content: String,
  family: { type: ObjectId, ref: "Family" },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
