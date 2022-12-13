import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import TaskList from "./components/TaskList.js";
import Account from "./components/Account.js";
import FamFeed from "./components/FamFeed.js";
import Navbar from "./components/Navbar.js";
import GroceryList from "./components/GroceryList.js";
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
          <Route exact path="/logout" element={<Login />} />
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
            path="/groceries"
            element={
              user ? (
                <GroceryList user={user} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          />
          <Route
            exact
            path="/account"
            element={
              user ? (
                <Account user={user} />
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
