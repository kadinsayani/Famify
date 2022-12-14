import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import Post from "./Post.js";
import "./FamFeed.css";
import axios from "axios";
import MembersPanel from "./MembersPanel";

function FamFeed() {

  const [currentUser, setCurrentUser] = useState()
  const [members, setMembers] = useState()

  const [posts, setPosts] = useState([]);

  const getPosts = () => {

    function postsChanged(newPosts) {

      if (newPosts.length !== posts.length) return true

      for (let i = 0; i < newPosts.length; i++) {
        if (!posts.some((post) => post._id === newPosts[i]._id)) {
          return true
        }
      }

      for (let i=0; i < newPosts.length; i++) {
        const newPost = newPosts[i]
        const oldPost = posts.find(post => {
          return post._id === newPost._id
        })

        const newReactions = newPost.reactions
        const oldReactions = oldPost.reactions
        
        if ((!newReactions && oldReactions) || (newReactions && !oldReactions)) return true
        if (!newReactions && !oldReactions) return true

        if (newReactions.length !== oldReactions.length) return true
      }

      return false

    }

    const config = {
      url: "http://localhost:3001/post",
      method: "get",
      withCredentials: true,
    };

    axios
      .request(config)
      .then((res) => {

        const resData = res.data;
        const newPosts = [];

        for (let i = 0; i < resData.length; i++) {
          if (!posts.some((post) => post._id === resData[i]._id)) {
            newPosts.push(resData[i]);
          }
        }

        if (postsChanged(resData)) {
          setPosts(resData.reverse())
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUser = () => {

    const config = {
      url: "http://localhost:3001/user",
      method: "get",
      withCredentials: true,
    };

    axios
      .request(config)
      .then((res) => {
        setCurrentUser(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  }

  const getMembers = () => {

    const config = {
      url: "http://localhost:3001/user/family/members",
      method: "get",
      withCredentials: true,
    };

    axios
      .request(config)
      .then((res) => {
        setMembers(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  }

  useEffect(() => {
    getPosts();
    if (!currentUser) getUser();
    if (!members) getMembers();
  });

  return (
    <div className="post-app">
      <h1>FamFeed</h1>
      <PostForm onSubmit={getPosts} />
      <Post refresh={getPosts} posts={posts} />
      {/* <MembersPanel currentUser={currentUser} members={members} /> */}
    </div>
  );
}

export default FamFeed;
