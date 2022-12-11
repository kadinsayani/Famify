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
import Logout from "./components/Logout";

const App = () => {
  const [user, setLoginUser] = useState();

  return (
    <>
      <Router>
        {user && <Navbar />}
        <Routes>
          <Route
            exact
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
            exact
            path="/login"
            element={<Login setLoginUser={setLoginUser} />}
          />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route
            exact
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
            exact
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
            exact
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
            exact
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
