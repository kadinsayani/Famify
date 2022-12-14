import React, { useState, useEffect } from "react";
import "./FamFeed.css";
import PostInstance from "./PostInstance.js";
import axios from "axios";

function Post(props) {
  const [user, setUser] = useState()

  useEffect(() => {
    if (!user) {

    const config = {
      url: "http://localhost:3001/user",
      method: "get",
      withCredentials: true,
    };

    axios
      .request(config)
      .then((res) => {
        setUser(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

    }
  })

  return <div>{props.posts.map((post, index) => (
    <PostInstance key={post._id} postID={post._id} date={post.date} time={post.time} user={post.user} content={post.content} currentUser={user} reactions={post.reactions} refresh={props.refresh}/>
  ))}</div>
}

export default Post;
