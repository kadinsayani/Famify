import React from "react";
import "./FamFeed.css";

function Post({ posts }) {
  return posts.map((post, index) => (
    <div key={post._id}>
      <div className="post">
        [{post.date} at {post.time}]<span id="username">{post.user}:</span>
        {post.content}
      </div>
    </div>
  ));
}

export default Post;
