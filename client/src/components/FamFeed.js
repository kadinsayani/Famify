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

    axios
      .request(config)
      .then((res) => {
        const resData = res.data;
        const newPosts = []

        // if there are new posts, update state
        // do not update state if there are no new posts!
        for (let i=0; i < resData.length; i++) {
          if (!posts.some(post => post._id === resData[i]._id)) {
            newPosts.push(resData[i])
          }
        }

        if (newPosts.length > 0) {
          setPosts(posts.concat(newPosts))
        }

        console.log(newPosts.length)

      })
      .catch((err) => {
        console.log(err.status);

        // if err.status === 401, reroute to login
      });
  };

  useEffect(() => {
    getPosts();
  });

  return (
    <div className="famfeed">
      <div className="post-app">
        <h1>Fam Feed</h1>
        <PostForm onSubmit={getPosts} />
        <Post posts={posts} />
      </div>
    </div>
  );
}

export default FamFeed;
