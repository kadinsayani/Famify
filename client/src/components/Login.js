import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoginUser }) => {
  const [user, setUser] = useState({
    username: "",
    family: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios.post("/login", user).then((res) => {
      alert(res.data.message);
      setLoginUser(res.data.user);
    });
  };

  return (
    <div>
      <h1>Login</h1>

      <form action="#">
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          name="username"
          defaultValue={user.username}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="text"
          id="password"
          name="password"
          defaultValue={user.password}
          onChange={handleChange}
        />

        <label htmlFor="password">Family:</label>
        <input
          type="text"
          id="family"
          name="family"
          defaultValue={user.family}
          onChange={handleChange}
        />
      </form>

      <button type="submit" onClick={useNavigate("/register")}>
        Don't have an account?
      </button>

      <button type="submit" onClick={login}>
        Login
      </button>
    </div>
  );
};

export default Login;
