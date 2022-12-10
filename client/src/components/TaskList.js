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
    setShow(false);
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
    <div className="tasklist-container">
      <div className="header">
        <h1>Task List</h1>
      </div>

        <div className="task-container text-center">
          <Modal 
            onClose={() => setShow(false)} 
            show={show}
            onSubmit={addTask}
          />

          <Task
            tasks={tasks}
            completeTask={completeTask}
            removeTask={removeTask}
            updateTask={updateTask}
          />
        </div>
        
        <div className="task-container footer">
        <button className="open-modal-button" onClick={() => setShow(true)}>Add Task</button>
        <p> </p>
        </div>
      
        {/* <TaskForm onSubmit={addTask} /> */}
      
    </div>
  );
}

export default TaskList;
