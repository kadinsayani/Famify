import React, {useState} from "react";
import "./FamFeed.css";
import { BsPersonCircle } from "react-icons/bs";
import { TfiTrash } from "react-icons/tfi";
import PostReactionButton from "./PostReactionButton";
import axios from "axios";

function PostInstance(props) {

  const emojiSize = 20

  const [actionsDivStyle, setActionsDivStyle] = useState({display: "none"})

  const handleMouseEnter = () => {
    setActionsDivStyle({
      display: "flex"
    })
  }

  const handleMouseLeave = () => {
    setActionsDivStyle({
      display: "none"
    })
  }

  // actions

  function handleDelete() {
    const config = {
      url: `http://localhost:3001/post/${props.postID}`,
      method: "delete",
      withCredentials: true,
    };

    axios
      .request(config)
      .then((res) => {
        props.refresh()
        // enable?
        //alert(`Deleted post:\n"${props.content}"`)
      })
      .catch(err => {
        console.log(err)
      })
  }

  // end actions

  const deleteButton = 
    props.currentUser.username === props.user ? <div className="actionButton" onClick={handleDelete}> <TfiTrash size={emojiSize} /> </div> : <div></div>

  const count1 = props.reactions.filter(reaction => reaction.reaction.toString() === "1").length
  const count2 = props.reactions.filter(reaction => reaction.reaction.toString() === "2").length
  const count3 = props.reactions.filter(reaction => reaction.reaction.toString() === "3").length
  const count4 = props.reactions.filter(reaction => reaction.reaction.toString() === "4").length
  const count5 = props.reactions.filter(reaction => reaction.reaction.toString() === "5").length

  const pressed1 = props.reactions.some(reaction => reaction.reaction.toString() === "1" && reaction.user.toString() === props.currentUser.id)
  const pressed2 = props.reactions.some(reaction => reaction.reaction.toString() === "2" && reaction.user.toString() === props.currentUser.id)
  const pressed3 = props.reactions.some(reaction => reaction.reaction.toString() === "3" && reaction.user.toString() === props.currentUser.id)
  const pressed4 = props.reactions.some(reaction => reaction.reaction.toString() === "4" && reaction.user.toString() === props.currentUser.id)
  const pressed5 = props.reactions.some(reaction => reaction.reaction.toString() === "5" && reaction.user.toString() === props.currentUser.id)

  return (
  <div className="postDiv" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

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

    <div className="actionsDiv" style={actionsDivStyle}>

      <PostReactionButton reaction={1} postID={props.postID} count={count1} pressed={pressed1} />
      <PostReactionButton reaction={2} postID={props.postID} count={count2} pressed={pressed2} />
      <PostReactionButton reaction={3} postID={props.postID} count={count3} pressed={pressed3} />
      <PostReactionButton reaction={4} postID={props.postID} count={count4} pressed={pressed4} />
      <PostReactionButton reaction={5} postID={props.postID} count={count5} pressed={pressed5} />
      {deleteButton}

    </div>

  </div>
  )

}

export default PostInstance;
