import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavbarData } from "./NavbarData";
import "./Navbar.css";
import { IconContext } from "react-icons";

function Navbar() {
  return (
    <>
      <IconContext.Provider value={{ color: "#0eb2fc" }}>
        <div className="navbar"></div>
        <nav className="nav-menu">
          <ul className="nav-menu-items">
            <a href="/homepage" onClick={useNavigate("/famfeed")}>
              <img alt="famify logo" src="/famify_logo.png"></img>
            </a>

            {NavbarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
