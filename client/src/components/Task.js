import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import CustomCheckbox from "./CustomCheckbox";
import "./Task.css";

function Task({ tasks, completeTask, removeTask, updateTask }) {

  const [checked, setChecked] = useState(false);

  const [edit, setEdit] = useState({ 
    id: null, 
    value: "",
  });

  const submitUpdate = (value) => {
    updateTask(edit.id, value);
    
    setEdit({
      id: null,
      value: "",
    });

  };
  if (edit.id) {
    // return <TaskForm edit={edit} onSubmit={submitUpdate} />;
  }
  
  return tasks.map((task, index) => (
    <div
      className={task.isComplete ? "task-row complete" : "task-row"}
      key={index}
    >
      <CustomCheckbox checked={task.isComplete} onChange={() => setChecked(!checked)} />
      <div className="task-text"
        key={task.id} 
        onClick={() => completeTask(task.id)}
        >
        {task.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTask(task.id)}
          className="delete-icone"
        />
        <TiEdit
          onClick={() => setEdit({ id: task.id, value: task.text })}
          className="edit-icone"
        />
      </div>
    </div>
  ));
}

export default Task;
