import { React, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Homepage from "./components/Homepage.js";

const App = () => {
  const [user, setLoginUser] = useState({});
  return (
    <div>
      <Routes>
        <Route path="/" element={user && user._id ? <Homepage /> : <Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
