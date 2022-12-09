import React from "react";

function Post({ posts }) {
  return posts.map((post, index) => <div key={post._id}>{post.content}</div>);
}

export default Post;
