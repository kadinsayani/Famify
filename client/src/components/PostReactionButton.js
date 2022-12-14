import React, {useState} from "react";
import "./FamFeed.css";
import axios from 'axios'
import { FaSmile, FaLaughBeam, FaFrown, FaSadCry, FaHeart } from "react-icons/fa";

function PostReactionButton(props) {
    
    const reaction = props.reaction

    const [pressed, setPressed] = useState(props.pressed)
    const [count, setCount] = useState(props.count)

    const emojiColour = "#ffe4a4"
    const emojiPressedColour = "#FFCB4C"
    const emojiSize = 20

    /**
   * POST a reaction to post.
   * @param {Number} reaction - An integer [1,5]
   */

    function handlePressed() {

        setCount(pressed ? count - 1 : count + 1)
        setPressed(!pressed)

        const method = pressed ? "delete" : "put"

        const config = {
        url: `http://localhost:3001/react/post/${props.postID}/${reaction}`,
        method: method,
        withCredentials: true,
        };

        axios
        .request(config)
        .then((res) => {

        })
        .catch(err => {
            console.log(err)
        })

    }

    let emoji = null

    switch(reaction) {
        case (1):
            emoji = <FaSmile color={pressed ? emojiPressedColour : emojiColour} size={emojiSize} />
            break
        case (2):
            emoji = <FaLaughBeam color={pressed ? emojiPressedColour : emojiColour} size={emojiSize} />
            break
        case (3):
            emoji = <FaFrown color={pressed ? emojiPressedColour : emojiColour} size={emojiSize} />
            break
        case (4):
            emoji = <FaSadCry color={pressed ? emojiPressedColour : emojiColour} size={emojiSize} />
            break
        case (5):
            emoji = <FaHeart color={pressed ? emojiPressedColour : emojiColour} size={emojiSize} />
            break
        default:
            emoji = <FaSmile color={pressed ? emojiPressedColour : emojiColour} size={emojiSize} />
    }

    return (

        <div className="actionButton" onClick={handlePressed}>
            {emoji}
            {count}
        </div>

    )

}

export default PostReactionButton