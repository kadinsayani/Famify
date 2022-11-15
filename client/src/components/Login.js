import React, { useState } from "react";
import axios from "axios";
import register from "./Register";

const Login = ({ setLoginUser }) => {
  const [user, setUser] = useState({
    username: "",
    family: "",
    password: "",
  });
  const handleChange = (e) => {
    const { username, value } = e.target;
    setUser({
      ...user,
      [username]: value,
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
        <label for="username">Username: </label>
        <input
          type="text"
          id="username"
          name="username"
          value={user.username}
          onChange={handleChange}
        />

        <label for="password">Password:</label>
        <input
          type="text"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />

        <label for="password">Family:</label>
        <input
          type="text"
          id="family"
          name="family"
          value={user.family}
          onChange={handleChange}
        />
      </form>

      <button type="submit" onClick={register}>
        Don't have an account?
      </button>

      <button type="submit" onClick={login}>
        Login
      </button>
    </div>
  );
};

export default Login;
