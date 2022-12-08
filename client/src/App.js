import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Homepage from "./components/Homepage.js";
import TaskList from "./components/TaskList.js";
import FamFeed from "./components/FamFeed.js";
import Navbar from "./components/Navbar.js";
import ListOfLists from "./components/ListOfLists.js";

const App = () => {
  const [user, setLoginUser] = useState({});
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={user ? <Homepage /> : <Login setLoginUser={user} />}
          />
          <Route path="/homepage" element={<Homepage />} />
          <Route
            path="/login"
            element={<Login setLoginUser={setLoginUser} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/tasklist" element={<TaskList />} />
          <Route path="/famfeed" element={<FamFeed />} />
          <Route path="/listoflists" element={<ListOfLists />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
