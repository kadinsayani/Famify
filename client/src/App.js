import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import TaskList from "./components/TaskList.js";
import FamFeed from "./components/FamFeed.js";
import Navbar from "./components/Navbar.js";
import ListOfLists from "./components/ListOfLists.js";
import Notifications from "./components/Notifications.js";

const App = () => {
  const [user, setLoginUser] = useState(null);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <FamFeed user={user} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          />
          <Route
            path="/login"
            element={<Login setLoginUser={setLoginUser} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/tasklist"
            element={
              user ? (
                <TaskList user={user} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          />
          <Route
            path="/famfeed"
            element={
              user ? (
                <FamFeed user={user} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          />
          <Route
            path="/listoflists"
            element={
              user ? (
                <ListOfLists user={user} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          />
          <Route
            path="/notifications"
            element={
              user ? (
                <Notifications user={user} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
