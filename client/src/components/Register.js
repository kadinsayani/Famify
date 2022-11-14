import React from "react";

export default function Login() {
  return (
    <div>
      <h1>Register</h1>
      <form>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" />
        <label for="password">Password:</label>
        <input type="text" id="password" name="password" />
        <label for="familycode">Family join code:</label>
        <input type="text" id="familycode" name="familycode" />
      </form>
      <button type="submit">Submit</button>
    </div>
  );
}
