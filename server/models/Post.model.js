import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  content: String,
  family: { type: ObjectId, ref: "Family" },
  user: { type: ObjectId, ref: "User" },
  date: String,
  time: String,
  reactions: [{
    user: {type: ObjectId, ref: "User"}, 
    reaction: Number,
    _id: false
  }]
});

const Post = mongoose.model("Post", postSchema);

export default Post;
