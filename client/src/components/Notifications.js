import React from "react";
import Notification from "./Notification.js";
import "./Notifications.css";

function Notifications() {

  // for testing
  // TODO: implement backend
  const notifications = [
    {
      content: "Sarah Smith reacted to your post: 😀",
      when: "1 hour ago"
    },
    {
      content: "Kiyana Smith reacted to your post: 😂",
      when: "2 days ago"
    },
    {
      content: "Ryan Smith reacted to your post: 😲",
      when: "4 days ago"
    }
  ]

  const board = <div className="notifications">
        <div className="notify-app">
          <h1>Notifications</h1>

          {notifications.map(notification => {
            return <Notification content={notification.content} when={notification.when} />
          })}

        </div>
      </div>

  return board
}

export default Notifications;
