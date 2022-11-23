import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  post: String,
  family: [{ type: ObjectId, ref: "Family" }],
});

const Post = mongoose.model("Post", postSchema);

export default Post;
