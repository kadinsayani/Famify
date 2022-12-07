import React, { useState } from "react";
import PostForm from "./PostForm";
import Post from "./Post.js";
import "./FamFeed.css";

function FamFeed() {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    const newPosts = [post, ...posts];
    setPosts(newPosts);
  };

  return (
    <div className="famfeed">
      <div className="post-app">
        <h1>Fam Feed</h1>
        <PostForm onSubmit={addPost} />
        <Post posts={posts} />
      </div>
    </div>
  );
}

export default FamFeed;
