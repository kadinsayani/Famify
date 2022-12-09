import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import Post from "./Post.js";
import "./FamFeed.css";
import axios from "axios";

function FamFeed() {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios.get("http://localhost:3001/post").then((res) => {
      const posts = JSON.parse(res.data.posts);

      const newPosts = [];
      posts.forEach((post) => {
        newPosts.push(post.content);
      });

      setPosts(newPosts);
    });
  };

  const addPost = (post) => {
    const newPosts = [post, ...posts];
    setPosts(newPosts);
  };

  useEffect(() => {
    getPosts();
  });

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
