import React, {useState, useEffect} from "react";
import "./FamFeed.css";
import { BsPersonCircle } from "react-icons/bs";
import { TfiTrash } from "react-icons/tfi";
import { FaSmile, FaLaughBeam, FaFrown, FaSadCry, FaHeart } from "react-icons/fa";
import axios from 'axios'

function PostInstance(props) {

  const [actionsDivStyle, setActionsDivStyle] = useState({display: "none"})

  const [reactions1, setReactions1] = useState(props.reactions.filter(reaction => reaction.reaction.toString() === "1").length)
  const [reactions2, setReactions2] = useState(props.reactions.filter(reaction => reaction.reaction.toString() === "2").length)
  const [reactions3, setReactions3] = useState(props.reactions.filter(reaction => reaction.reaction.toString() === "3").length)
  const [reactions4, setReactions4] = useState(props.reactions.filter(reaction => reaction.reaction.toString() === "4").length)
  const [reactions5, setReactions5] = useState(props.reactions.filter(reaction => reaction.reaction.toString() === "5").length)

  const emojiColour = "#FFCB4C"
  const emojiSize = 20

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

  /**
   * POST a reaction to post.
   * @param {Number} reaction - An integer [1,5]
   */
  function reactToPost(reaction) {
    const config = {
      url: `http://localhost:3001/react/post/${props.postID}/${reaction}`,
      method: "put",
      withCredentials: true,
    };

    axios
      .request(config)
      .then((res) => {
        // do not refresh so it doesn't bring the view back up
        //props.refresh()
        switch(reaction.toString()) {
          case("1"):
            setReactions1(reactions1 + 1)
            break
          case("2"):
            setReactions2(reactions2 + 1)
            break
          case("3"):
            setReactions3(reactions3 + 1)
            break
          case("4"):
            setReactions4(reactions4 + 1)
            break
          case("5"):
            setReactions5(reactions5 + 1)
            break
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  // end actions

  const deleteButton = 
    props.currentUser.username === props.user ? <div className="actionButton" onClick={handleDelete}> <TfiTrash size={emojiSize} /> </div> : <div></div>

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

      <div className="actionButton" onClick={() => reactToPost(1)}> <FaLaughBeam color={emojiColour} size={emojiSize} /> {reactions1} </div>
      <div className="actionButton" onClick={() => reactToPost(2)}> <FaSmile color={emojiColour} size={emojiSize} /> {reactions2} </div>
      <div className="actionButton" onClick={() => reactToPost(3)}> <FaFrown color={emojiColour} size={emojiSize} /> {reactions3} </div>
      <div className="actionButton" onClick={() => reactToPost(4)}> <FaSadCry color={emojiColour} size={emojiSize} /> {reactions4} </div>
      <div className="actionButton" onClick={() => reactToPost(5)}> <FaHeart color={emojiColour} size={emojiSize} /> {reactions5} </div>
      {deleteButton}

    </div>

  </div>
  )

}

export default PostInstance;
