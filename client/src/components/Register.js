import React, { useState } from "react";
import axios from "axios";

const Register = () => {
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
  const createUser = () => {
    const { username, family, password } = user;
    if (username && password && family) {
      axios.post('http://localhost:3001/register', user).then((res) => {
        console.log(res.data);
      });
    } else {
      alert("Please enter username and password");
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <label htmlFor="family">Family:</label>
        <input
          type="text"
          id="family"
          name="family"
          value={user.family}
          onChange={handleChange}
        />
      </form>
      <button type="submit" onClick={createUser}>
        Register
      </button>
    </div>
  );
};

export default Register;
