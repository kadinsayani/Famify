import { React, useState } from "react";
import "./App.css";
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
          <Route
            path="/"
            element={user && user._id ? <Homepage /> : <Login />}
          ></Route>
          <Route
            path="/login"
            element={<Login setLoginUser={setLoginUser} />}
          ></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
