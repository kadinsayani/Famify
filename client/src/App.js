import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register.js";

const App = () => {
  return (
    <div>
      <Register />
    </div>
  );
};

export default App;
