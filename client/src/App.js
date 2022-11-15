import { React, useState } from "react";
// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Homepage from "./components/Homepage.js";

const App = () => {
  const [user, setLoginUser] = useState({});
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/">
            {user && user._id ? <Homepage /> : <Login />} <Homepage />
          </Route>
          <Route path="/Login">
            <Login setLoginUser={setLoginUser} />
          </Route>
          <Route path="/Register">
            <Register />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
