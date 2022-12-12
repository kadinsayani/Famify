import React, { useState, useEffect, useRef } from "react";
import "./ListForm.css";

function ListForm(props) {
  const [input, setInput] = useState("");

  const focus = useRef(null);
  useEffect(() => {
    focus.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    setInput("");
  };

  return (
    <div className="listform-body">
      <form className="list-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Grocery Item"
          value={input}
          name="text"
          className="list-input"
          onChange={handleChange}
          ref={focus}
        />
        <br />
        <button className="list-button">Add Item</button>
      </form>
    </div>
  );
}

export default ListForm;
