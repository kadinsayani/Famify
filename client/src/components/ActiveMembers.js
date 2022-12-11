import React from "react";
import "./ActiveMembers.css";
import { BsPersonCircle } from "react-icons/bs";
import { IconContext } from "react-icons";

function ActiveMembers() {
  return (
    <>
      <IconContext.Provider value={{ color: "#0eb2fc", size: "30px" }}>
        <div className="activemembers"></div>
        <nav className="members-menu">
          <BsPersonCircle />
          <ul className="members-menu-items"></ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default ActiveMembers;
