import React, { useState } from "react";
import TaskForm from "./TaskForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import CustomCheckbox from "./CustomCheckbox";
import "./Task.css";

function Task({ tasks, completeTask, removeTask, updateTask }) {
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

  // move the useState hook outside the map function
  const [checkedTasks, setCheckedTasks] = useState([]);

  return tasks.map((task, index) => {
    // use the checkedTasks state variable to control the strikethrough for this task
    const isChecked = checkedTasks.includes(task._id);

    return (
      <div
        className={task.isComplete ? "task-row complete" : "task-row"}
        key={task._id}
      >
        {edit.id === task._id ? (
          <TaskForm edit={edit} onSubmit={submitUpdate} />
        ) : (
          <>
            <CustomCheckbox
              checked={isChecked}
              onChange={() => {
                if (isChecked) {
                  // remove the task from the checkedTasks array
                  setCheckedTasks(checkedTasks.filter((id) => id !== task._id));
                } else {
                  // add the task to the checkedTasks array
                  setCheckedTasks([...checkedTasks, task._id]);
                }
              }}
            />
            <div
              className={`task-text ${isChecked ? "strikethrough" : ""}`}
              key={task._id}
              onClick={() => completeTask(task._id)}
            >
              {task.content} [Priority: 1]
            </div>
            <div className="icons">
              <RiCloseCircleLine
                onClick={() => removeTask(task._id)}
                className="delete-icone"
              />
              <TiEdit
                onClick={() => setEdit({ id: task._id, value: task.text })}
                className="edit-icone"
              />
            </div>
          </>
        )}
      </div>
    );
  });
}

export default Task;
