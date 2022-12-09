import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import Post from "./Post.js";
import "./FamFeed.css";
import axios from "axios";

function FamFeed() {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    const config = {
      url: "http://localhost:3001/post",
      method: "get",
      withCredentials: true,
    };

    axios.request(config).then((res) => {
      
      const posts = res.data;
      setPosts(posts);

    }).catch((err) => {
      console.log(err.status)

      // if err.status === 401, reroute to login

    });;
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
