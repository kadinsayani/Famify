import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoginUser }) => {
  const [user, setUser] = useState({
    username: "",
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

  const config = {
    url:'http://localhost:3001/login',
    method:'post',
    withCredentials: true,
    data:{
      username: user.username,
      password: user.password
    }
  }

  console.log(config)
  
  axios.request(config)
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })

  };

  return (
    <div>
      <h1>Login</h1>

      <form>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          name="username"
          value={user.username}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
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
