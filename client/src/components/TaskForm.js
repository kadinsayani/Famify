import React, { useState, useEffect, useRef } from "react";

function TaskForm(props) {
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
    <div>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a task"
          value={input}
          name="text"
          className="task-input"
          onChange={handleChange}
          ref={focus}
        />
        <button className="task-button">Add Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
