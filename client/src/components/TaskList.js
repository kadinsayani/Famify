import React, { useState, useEffect } from "react";
import Task from "./Task.js";
import "./TaskList.css";
import Modal from "./Modal";
import axios from "axios";

function TaskList(props) {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);

  const getTasks = () => {
    const config = {
      url: "http://localhost:3001/tasks",
      method: "get",
      withCredentials: true,
    };

    axios
      .request(config)
      .then((res) => {
        const resData = res.data;
        const newTasks = [];

        for (let i = 0; i < resData.length; i++) {
          if (!tasks.some((task) => task._id === resData[i]._id)) {
            newTasks.push(resData[i]);
          }
        }

        if (newTasks.length > 0) {
          const taskText = newTasks.map((task) => task.content);
          setTasks(tasks.concat(taskText));
        }
      })
      .catch((err) => {
        console.log(err.status);
      });
  };

  const createTask = (task) => {
    console.log(task);

    const config = {
      url: "http://localhost:3001/tasks",
      method: "post",
      withCredentials: true,
      data: {
        content: task,
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

  useEffect(() => {
    getTasks();
  });

  const addTask = (task) => {
    const newTasks = [task, ...tasks];
    setTasks(newTasks);
    setShow(false);
    createTask(task.text);
  };

  const removeTask = (id) => {
    const removeArr = [...tasks].filter((task) => task.id !== id);
    setTasks(removeArr);
  };

  const completeTask = (id) => {
    let updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const updateTask = (taskId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      // if newValue.text is empty or only spaces
      return; // do nothing
    }

    setTasks((prev) =>
      prev.map((item) => (item.id === taskId ? newValue : item))
    );
  };

  return (
    <div className="tasklist-container">
      <div className="header">
        <h1>Task List</h1>
      </div>

      <div className="task-container text-center">
        <Modal onClose={() => setShow(false)} show={show} onSubmit={addTask} />

        <Task
          tasks={tasks}
          completeTask={completeTask}
          removeTask={removeTask}
          updateTask={updateTask}
        />
      </div>

      <div className="task-container footer">
        <button className="open-modal-button" onClick={() => setShow(true)}>
          Add Task
        </button>
        <p> </p>
      </div>
    </div>
  );
}

export default TaskList;
