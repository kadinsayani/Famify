import React from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
export const NavbarData = [
  {
    title: "Famfeed",
    path: "/famfeed",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Lists",
    path: "/listoflists",
    icon: <FaIcons.FaList />,
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
    title: "Log Out",
    path: "/logout",
    icon: <FaIcons.FaArrowLeft />,
    cName: "nav-text",
  },
];
