import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./FamFeed.css";
import { BsPersonCircle } from "react-icons/bs";

function PostForm(props) {
  const [input, setInput] = useState("");

  const focus = useRef(null);
  useEffect(() => {
    focus.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  
  const Image = (props) => {
    return(
      <img src={props.image} alt="profile_picture" className="picture">
      </img>
    )
  }

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
        {/* <Image image={props.image}/> */}
        <h2><BsPersonCircle /></h2>
        <input
          type="text"
          placeholder="What's happening"
          value={input}
          name="text"
          className="task-input"
          onChange={handleChange}
          ref={focus}
        />
        <button className="post-button">Post</button>
      </form>
    </div>
  );
}

export default PostForm;
