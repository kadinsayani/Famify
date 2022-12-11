import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  subject: {type: ObjectId, ref: "User"},
  content: String,
  users: [{ type: ObjectId, ref: "User" }],
  date: String,
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
