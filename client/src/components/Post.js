import React from "react";

function Post({ posts }) {
  return posts.map((post, index) => <div key={post._id}>[{post.date} at {post.time}] {post.user}: {post.content}</div>);
}

export default Post;
