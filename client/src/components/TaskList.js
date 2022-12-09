import React, { useState } from "react";
import TaskForm from "./TaskForm";
import Task from "./Task.js";
import "./TaskList.css";
import Modal from "./Modal";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);

  const getTasks = () => {
    const config = {
      url: "http://localhost:3001/tasks",
      method: "get",
      withCredentials: true,
    };

    axios.request(config).then((res) => {
      const tasks = res.data;

      const newTasks = [];

      tasks.forEach((post) => {
        newTasks.push(post.content);
      });

      console.log(tasks);
      // setTasks(newTasks);
    });
  };

  const addTask = (task) => {
    const newTasks = [task, ...tasks];
    setTasks(newTasks);
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
    setTasks((prev) =>
      prev.map((item) => (item.id === taskId ? newValue : item))
    );
  };

  return (
    <div className="tasklist">
      <div className="task-app">
        <h1>Task List</h1>
        <button className="open-modal-button" onClick={() => setShow(true)}>Add task</button>
        <p> </p>
        <Modal onClose={() => setShow(false)} show={show} onSubmit={addTask} />
        <TaskForm onSubmit={addTask} />
        <Task
          tasks={tasks}
          completeTask={completeTask}
          removeTask={removeTask}
          updateTask={updateTask}
        />
      </div>
    </div>
  );
}

export default TaskList;
