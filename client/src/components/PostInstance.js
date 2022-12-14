import React, {useState} from "react";
import "./FamFeed.css";
import { BsPersonCircle } from "react-icons/bs";


function PostInstance(props) {

  return (
  <div className="postDiv" key={props.key}>

    <div className="userInfoDiv">
      <div className="userInfoImg">
        <BsPersonCircle color="#0eb2fc" size="30px" />
      </div>
      <span className="username">{props.user}</span>
      <span className="userInfoDateTime">{props.time} on {props.date}</span>
    </div>

    <div className="postContentDiv">

      {props.content}
    
    </div>

    <div className="actionsDiv">

      

    </div>

  </div>
  )

}

export default PostInstance;
