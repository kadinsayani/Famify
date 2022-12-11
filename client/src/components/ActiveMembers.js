import React from "react";
import "./ActiveMembers.css";
import { BsPersonCircle } from "react-icons/bs";
import { IconContext } from "react-icons";
import { ActiveMembersData } from "./ActiveMembersData";

function ActiveMembers() {
  return (
    <>
      <IconContext.Provider value={{ color: "#0eb2fc" }}>
        <div className="activemembers"></div>
        <nav className="members-menu">
        <BsPersonCircle />
          <ul className="members-menu-items">

            {ActiveMembersData.map((item, index) => {
              return (
                  <li key={index} className={item.cName}>
                          <span>{item.icon}</span>
                          <span>{item.title}</span>
                      </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default ActiveMembers;
