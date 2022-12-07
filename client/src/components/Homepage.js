import React from "react";
import FamFeed from "./FamFeed.js";
import TaskList from "./TaskList.js";
import "./Homepage.css";

const Homepage = () => {
  return (
    <>
      <h1>Homepage</h1>
      <div className="homepage">
        <>
          <FamFeed />
          <TaskList />
        </>
      </div>
    </>
  );
};

export default Homepage;
