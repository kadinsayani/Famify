import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
const { useNavigate } = require("react-router-dom");

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    joinCode: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const createUser = () => {
    
    if (user.username && user.password) {
      
      const config = {
        url: "http://localhost:3001/register",
        method: "post",
        withCredentials: true,
        data: {
          username: user.username,
          password: user.password,
          joinCode: user.joinCode
        },
      };
  
      axios
        .request(config)
        .then((res) => {

        }
        )
        .catch((err) => {

        })

    } else {
      alert("Please enter username and password");
    }
  };
  return (
    <div>
      <div className="container">
        <div className="image">
          <div className="bigbird">
            <img alt="" src="/famify_logo.png" />
          </div>
        </div>

        <div className="content">
          <h1>Create New Account</h1>

          <form>
            <label htmlFor="username">Username </label>
            <br></br>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Create a username"
              value={user.username}
              onChange={handleChange}
            />
            <label htmlFor="password">Password </label>
            <br></br>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              value={user.password}
              onChange={handleChange}
            />
            <label htmlFor="joinCode">Family Code </label>
            <br></br>
            <input
              type="text"
              id="joinCode"
              name="joinCode"
              placeholder="Create a family code to share with others"
              value={user.joinCode}
              onChange={handleChange}
            />
          </form>
          <button
            className="register-button"
            type="submit"
            onClick={() => {
              createUser();
              navigate("/famfeed");
            }}
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
