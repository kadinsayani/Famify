import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  family: {type: ObjectId, ref: 'Family'}
});

const User = mongoose.model("User", userSchema);

export default User;
