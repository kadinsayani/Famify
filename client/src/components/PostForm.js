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

    console.log(post)

    const config = {
      url: "http://localhost:3001/post",
      method: "post",
      withCredentials: true,
      data: {
        content: post
      }
    };

    axios
      .request(config)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    createPost(input);

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
        <button className="post-button" onClick={handleSubmit}>Add Post</button>
      </form>
    </div>
  );
}

export default PostForm;
