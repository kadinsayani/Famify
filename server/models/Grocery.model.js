import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const grocerySchema = new mongoose.Schema({
  content: String,
  family: { type: ObjectId, ref: "Family" },
  user: { type: ObjectId, ref: "User" },
  date: String,
  time: String,
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Task", grocerySchema);

export default Task;
