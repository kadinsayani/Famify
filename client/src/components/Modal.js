import React, { useState } from "react";
import "./Modal.css";

const Modal = (props) => {
  const [input, setInput] = useState("");

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

  if (!props.show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <button onClick={props.onClose} className="button">
            Close
          </button>
        </div>

        <div className="modal-body">
          <form className="task-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Add a task"
              value={input}
              name="text"
              className="task-input"
              onChange={handleChange}
            />
            <br></br>
            <button className="task-button">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
