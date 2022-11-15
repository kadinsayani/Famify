import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    family: "",
    password: "",
  });
  const handleChange = (e) => {
    const { username, value } = e.target;
    setUser({ ...user, [username]: value });
  };
  const register = () => {
    const { username, family, password } = user;
    if (username && password && family) {
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
          <label for="family">Family:</label>
          <input
            type="text"
            id="family"
            name="family"
            value={user.password}
            onChange={handleChange}
          />
        </form>
        <button type="submit" onClick={register}>
          Register
        </button>
      </div>
    );
  };
};

export default Register;
