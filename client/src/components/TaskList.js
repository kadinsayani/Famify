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

        // Update the tasks state with the complete list of tasks retrieved from the server
        setTasks(resData);
      })
      .catch((err) => {
        console.log(err.status);
      });
  };

  const createTask = (task, priority) => {
    console.log(task, priority);

    const config = {
      url: "http://localhost:3001/tasks",
      method: "post",
      withCredentials: true,
      data: {
        content: task,
        priority: priority,
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

  const generateUniqueId = () => {
    return Date.now() + Math.random();
  };

  const addTask = (task) => {
    // Generate a unique id for the new task
    const id = generateUniqueId();

    // Create a new task object with the id and text
    const newTask = {
      _id: id,
      content: task.text,
      // priority: task.priority,
    };

    // Create a new array with the new task and the existing tasks
    const newTasks = [newTask, ...tasks];

    // Update the tasks state with the new array
    setTasks(newTasks);
    setShow(false);
    createTask(task.text, task.priority);
  };

  const removeTask = (id) => {
    const removeArr = [...tasks].filter((task) => task._id !== id);
    setTasks(removeArr);
    const config = {
      url: `http://localhost:3001/tasks/${id}`,
      method: "delete",
      withCredentials: true,
    };
    axios
      .request(config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const completeTask = (id) => {
    // Find the task with the specified id
    const taskToComplete = tasks.find((task) => task._id === id);

    // Update the isComplete property of the task
    taskToComplete.isComplete = !taskToComplete.isComplete;

    // Create a new array with the updated task and the rest of the tasks
    const updatedTasks = [
      ...tasks.filter((task) => task._id !== id),
      taskToComplete,
    ];

    // Update the tasks state with the new array
    setTasks(updatedTasks);

    // Send a request to the server to update the task in the database
    const config = {
      url: `http://localhost:3001/tasks/${id}`,
      method: "patch",
      withCredentials: true,
      data: {
        isComplete: taskToComplete.isComplete,
      },
    };

    axios
      .request(config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTask = (taskId, newValue) => {
    // Find the task with the specified id
    const taskToUpdate = tasks.find((task) => task._id === taskId);

    // Update the task's properties with the new values
    taskToUpdate.content = newValue.text;
    // taskToUpdate.priority = newValue.priority;

    // Create a new array with the updated task and the rest of the tasks
    const updatedTasks = [
      ...tasks.filter((task) => task._id !== taskId),
      taskToUpdate,
    ];

    // Update the tasks state with the new array
    setTasks(updatedTasks);

    // Send a request to the server to update the task in the database
    const config = {
      url: `http://localhost:3001/tasks/${taskId}`,
      method: "patch",
      withCredentials: true,
      data: {
        content: taskToUpdate.content,
        // priority: taskToUpdate.priority,
      },
    };

    axios
      .request(config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="tasklist-container">
      <div className="header">
        <h1>Task List</h1>
      </div>
      <div className="task-container footer">
        <button className="open-modal-button" onClick={() => setShow(true)}>
          Add Task
        </button>
        <p> </p>
      </div>
      <div className="task-container text-center">
        <Modal onClose={() => setShow(false)} show={show} onSubmit={addTask} onClick={addTask} />

        <Task
          tasks={tasks}
          completeTask={completeTask}
          removeTask={removeTask}
          updateTask={updateTask}
          //priority={task.priority}
        />
      </div>
    </div>
  );
}

export default TaskList;
