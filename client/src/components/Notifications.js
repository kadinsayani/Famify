import React, { useEffect, useState } from "react";
import Notification from "./Notification.js";
import "./Notifications.css";
import axios from "axios";

function Notifications() {

  const [notifications, setNotifications] = useState([])

  function getNotifications() {
    const config = {
      url: "http://localhost:3001/notifications",
      method: "get",
      withCredentials: true,
    };

    axios
      .request(config)
      .then((res) => {
        const resData = res.data;
        const newNotifications = []

        // if there are new notifications, update state
        for (let i=0; i < resData.length; i++) {
          if (!notifications.some(notification => notification._id === resData[i]._id)) {
            newNotifications.push(resData[i])
          }
        }

        if (newNotifications.length > 0) {
          //const _newNotifications = fillUsernames(notifications.concat(newNotifications))
          setNotifications(newNotifications)
        }

        console.log(newNotifications.length)

      })
      .catch((err) => {
        console.log(err);
        // if err.status === 401, reroute to login
      });
  }

  function fillUsernames(_notifications) {

    const namedNotifications = _notifications
    console.log("A")

    for (let i=0; i < namedNotifications.length; i++) {

      const config = {
        url: `http://localhost:3001/user/${namedNotifications[i].subject}`,
        method: "get",
        withCredentials: true,
      };
  
      axios
        .request(config)
        .then((res) => {
          const username = res.data.username
          namedNotifications[i].subjectName = username
        })
        .catch((err) => {
          console.log(err)
        })

    }

  }

  useEffect(() => {

    getNotifications()

  })

  // process date from server
  function processDate(date) {
    switch(date) {

      // return

    }
  }

  const board = <div className="notifications">
        <div className="notify-app">
          <h1>Notifications</h1>

          {notifications.map(notification => {
            return <Notification subject={notification.subject} content={notification.content} when={notification.date} />
          })}

        </div>
      </div>

  return board
}

export default Notifications;
