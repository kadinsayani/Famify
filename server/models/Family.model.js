import { ObjectID, ObjectId } from "mongodb";
import mongoose from "mongoose";

const familySchema = new mongoose.Schema({
  joinCode: { type: String, required: true, unique: true },
  posts: [{ type: ObjectId, ref: "Post" }],
  tasks: [{ type: ObjectId, ref: "Task" }],
  groceries: [{ type: ObjectID, ref: "Grocery" }],
  members: [{ type: ObjectId, ref: "User" }],
});

const Family = mongoose.model("Family", familySchema);

export default Family;
