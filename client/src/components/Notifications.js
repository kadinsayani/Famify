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
          fillUsernames(notifications.concat(newNotifications))
        }

      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fillUsernames(_notifications) {

    const namedNotifications = _notifications

    Promise.all(namedNotifications.map(notification => {

      const config = {
        url: `http://localhost:3001/user/${notification.subject}`,
        method: "get",
        withCredentials: true,
      };
  
      return axios.request(config)

    }))
    
    .then((responses) => {

      for (let i=0; i < responses.length; i++) {

        const username = responses[i].data.username
        namedNotifications[i].when = processDate(namedNotifications[i].date)
        namedNotifications[i].subjectName = username

      }

      setNotifications(namedNotifications.reverse())

    }).catch(err => {

      console.log(err)

    })


  }

  useEffect(() => {

    getNotifications()

  })

  // process date from server
  function processDate(date) {

    const HOUR = 60 * 60 * 1000
    const DAY = HOUR * 24

    date = new Date(date)
    const difference = new Date().getTime() - date.getTime()

    console.log(difference)

    if (difference < HOUR) return "Less than an hour ago"
    if (difference < DAY) return "1 day ago"
    if (difference > DAY && difference < 2*DAY) return "2 days ago"
    if (difference > 2*DAY && difference < 3*DAY) return "3 days ago"

    return null
  }

  const board = <div className="notifications">
        <div className="notify-app">
          <h1>Notifications</h1>

          {notifications.map(notification => {
            return <Notification subject={notification.subjectName ?? "A member"} content={notification.content} when={notification.when ?? notification.date} />
          })}

        </div>
      </div>

  return board
}

export default Notifications;
