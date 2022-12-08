import React, { useState } from "react";
import "./Modal.css";
import TaskForm from "./TaskForm";
import Task from "./Task.js";

const Modal = props => {
    const [tasks, setTasks] = useState([]);
    
    if (!props.show) {
        return null;
    }

    const addTask = (task) => {
        const newTasks = [task, ...tasks];
        setTasks(newTasks);
    };
    
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Modal Heading</h4>
                </div>
                <div className="modal-body">
                    <TaskForm onSubmit={addTask} />
                    <Task
                        tasks={tasks}
                    />
                </div>
                <div className="modal-footer">
                    <button onClick={props.onClose} className="button">Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;