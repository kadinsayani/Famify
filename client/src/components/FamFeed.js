import React, { useState } from "react";
import PostForm from "./PostForm";
import Post from "./Post.js";
import "./FamFeed.css";

function FamFeed(props) {
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", function () {
      const div = this.parentElement.querySelector("div");
      div.textContent = this.dataset.answer;
    });
  });

  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    const newPosts = [post, ...posts];
    setPosts(newPosts);
  };

  /* const Image = (props) => {
    return(
      <img src={props.image} alt="profile_picture" className="picture">
      </img>
    )
  } */

  return (
    <div className="post-app">
      <h1>Fam Feed</h1>
      <PostForm onSubmit={addPost} />
      <div className="post-app2">
        {/* get posts from database */}
        <Post posts={posts} />

        <button className="hide">Add a Reaction</button>
        {/* <div className = "dropdown-content">   */}
        <button className="Button" data-inline="true" data-answer="😃">
          😃
        </button>
        <button className="Button2" data-inline="true" data-answer="😂">
          😂
        </button>
        <button className="Button3" data-inline="true" data-answer="😲">
          😲
        </button>
        <button className="Button4" data-inline="true" data-answer="😢">
          😢
        </button>
        <button className="Button5" data-inline="true" data-answer="😭">
          😭
        </button>
      </div>
    </div>
  );
}

export default FamFeed;
