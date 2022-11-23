import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function PostForm(props) {
  const [input, setInput] = useState("");

  const focus = useRef(null);
  useEffect(() => {
    focus.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const createPost = (post) => {
    axios.post("http://localhost:3001/post", post).then((res) => {
      console.log(res);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    createPost({content: input});

    setInput("");
    
  };
  return (
    <div>
      <form className="post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a post"
          value={input}
          name="text"
          className="task-input"
          onChange={handleChange}
          ref={focus}
        />
        <button className="post-button">Add Post</button>
      </form>
    </div>
  );
}

export default PostForm;
