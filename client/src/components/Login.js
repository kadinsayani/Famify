import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Logo from "./famify_logo.png";

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
    axios.post("http://localhost:3001/login", user).then((res) => {
      alert(res.data);
      setLoginUser(res.data.user);
    });
  };

  return (
  <div>

    <div className="container">
      <div className="image">
        <div className="bigbird">
          <img src={Logo} />
        </div>
      </div>

      <div className="content">
        
        <h1>Login</h1>

        <form>
          <label htmlFor="username">Username </label>
          <br></br>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={user.username}
            onChange={handleChange}
          />
          <p></p>
          <br></br>

          <label htmlFor="password">Password</label>
          <br></br>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="*******"
            value={user.password}
            onChange={handleChange}
          />
        </form>
        
        <button className="login-button" type="submit" onClick={login}>
          LOG IN
        </button>
        <button className="register-button" type="submit" onClick={useNavigate("/register")}>
          Don't have an account?
        </button>
      </div>

    </div>
  </div>

  );
};

export default Login;
