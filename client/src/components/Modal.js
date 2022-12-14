import React, { useState } from "react";
import "./Modal.css";

const Modal = (props) => {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState(1);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handlePriority(e); // Call handlePriority to set the priority

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
      priority: priority,
    });

    setInput("");
    setPriority(1);
  };

  const handlePriority = (e) => {
    e.preventDefault();
    setPriority(e.target.value);
  };

  if (!props.show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <button
            onClick={props.onClose}
            className="close-button modal-header-right"
          >
            X
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
        <form className="priority-form" onClick={handlePriority}>
          <label><b>Set Priority Level</b> (between 1-3):</label>
          <input
            type="range"
            id="priority"
            name="priority"
            min="1"
            max="3"
            value={priority}
            onChange={handlePriority}
          />
          <br></br>
        </form>
      </div>
    </div>
  );
};

export default Modal;
