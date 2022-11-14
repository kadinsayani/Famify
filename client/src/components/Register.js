import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    const { username, value } = e.target;
    setUser({ ...user, [username]: value });
  };
  const register = () => {
    const { username, password } = user;
    if (username && password) {
      axios.post("/user/add", user).then((res) => {
        console.log(res.data);
      });
    } else {
      alert("Please enter username and password");
    }
    return (
      <div>
        <h1>Register</h1>
        <form>
          <label for="username">Username:</label>
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
          <label for="familycode">Family join code:</label>
          <input type="text" id="familycode" name="familycode" />
        </form>
        <button type="submit" onClick={register}>
          Register
        </button>
      </div>
    );
  };
};

export default Register;
