import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./FamFeed.css";
import { IconContext } from "react-icons/lib";
import { SlSpeech } from "react-icons/sl"

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
    console.log(post);

    const config = {
      url: "http://localhost:3001/post",
      method: "post",
      withCredentials: true,
      data: {
        content: post,
      },
    };

    axios
      .request(config)
      .then((res) => {
        console.log(res);
        props.onSubmit();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: remove if not needed
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    createPost(input);

    setInput("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="post-form">

          <div id="inputDiv">

            <IconContext.Provider value={{ color: "#0eb2fc", size: "50px" }}>
              <div id="posterImage">
                <SlSpeech />
              </div>
            </IconContext.Provider>
            
            <input
              type="text"
              placeholder="What's happening?"
              value={input}
              name="text"
              className="task-input"
              onChange={handleChange}
              ref={focus}
            />
          </div>

          <div id="buttonDiv">

            <button className="post-button" onClick={handleSubmit}>
              Post
            </button>

          </div>

        </div>
      </form>
    </div>
  );
}

export default PostForm;
