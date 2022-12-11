import React from "react";
import "./Logout.css";
const { useNavigate } = require("react-router-dom");

function Logout() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="logout">
        <h1>Logged out</h1>
        <button onClick={() => navigate("/login")}>
          Click here to log back in
        </button>
      </div>
    </div>
  );
}

export default Logout;
