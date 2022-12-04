import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Homepage from "./components/Homepage.js";
import TaskList from "./components/TaskList.js";
import FamFeed from "./components/FamFeed";

const App = () => {
  const [user, setLoginUser] = useState({});
  return (
    <div>
      <Routes>
        <Route path="/" element={user && user._id ? <Homepage /> : <Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasklist" element={<TaskList />} />
        <Route path="/famfeed" element={<FamFeed />} />
      </Routes>
    </div>
  );
};

export default App;
