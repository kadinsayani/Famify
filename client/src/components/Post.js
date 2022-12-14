import React from "react";
import "./FamFeed.css";
import PostInstance from "./PostInstance.js";

function Post({ posts }) {
  return posts.map((post, index) => (
    <PostInstance key={post.key} date={post.date} time={post.time} user={post.user} content={post.content}/>
  ));
}

export default Post;
