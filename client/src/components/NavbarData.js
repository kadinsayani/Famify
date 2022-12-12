import React from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
export const NavbarData = [
  {
    title: "FamFeed",
    path: "/famfeed",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Groceries",
    path: "/groceries",
    icon: <FaIcons.FaCarrot />,
    cName: "nav-text",
  },
  {
    title: "Tasks",
    path: "/tasklist",
    icon: <FaIcons.FaCheck />,
    cName: "nav-text",
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: <FaIcons.FaBell />,
    cName: "nav-text",
  },
  {
    title: "Account",
    path: "/account",
    icon: <FaIcons.FaUser />,
    cName: "nav-text",
  },
  {
    title: "Log Out",
    path: "/logout",
    icon: <FaIcons.FaArrowLeft />,
    cName: "nav-text",
  },
];
