import React from "react";
import "./Notifications.css";
import { FaUserCircle } from 'react-icons/fa'

function Notification(props) {

    const subject = props.subject
    const content = props.content
    const when = props.when

    return <div className="notificationDiv">

        <div className="userPhotoDiv">
            <FaUserCircle color="#0eb2fc" size={75}/>
        </div>
        <div>
            <div className="contentDiv">
                <strong>{subject}</strong> {content}
            </div>
            <div className="whenDiv">
                {when}
            </div>
        </div>

    </div>

}

export default Notification;