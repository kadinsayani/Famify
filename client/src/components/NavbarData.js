import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
export const NavbarData = [
  {
    title: "Homepage",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Famfeed",
    path: "/famfeed",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Tasks",
    path: "/tasklist",
    icon: <FaIcons.FaList />,
    cName: "nav-text",
  },
  {
    title: "Log Out",
    path: "",
    icon: <FaIcons.FaArrowLeft />,
    cName: "nav-text",
  },
];
