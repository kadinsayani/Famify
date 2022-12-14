import React, { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import '../components/MembersPanel.css'
import axios from "axios"

function MembersPanel(props) {

    const [status, setStatus] = useState("")

    const updateStatus = (e) => {
        e.preventDefault()
        const config = {
            url: "http://localhost:3001/status",
            method: "put",
            withCredentials: true,
            data: {
              content: status,
            },
        };
      
        axios
        .request(config)
        .then((res) => {
        })
    }

    const handleChange = (e) => {
        setStatus(e.target.value)
    }

    return (

        <div id="mainPanel">

            <div id="userPanel">

                <div id="userImageDiv">
                    <BsPersonCircle color="#0eb2fc" size={"50px"} />
                </div>

                <div id="userDiv">

                    <div id="userName">
                        {props.currentUser ? props.currentUser.username : ""}
                    </div>

                    <form onSubmit={updateStatus} id="statusBoxDiv">
                        <input id="statusBox" onChange={handleChange} defaultValue={props.currentUser ? props.currentUser.status : ""}
                            type="text" 
                        />
                    </form>

                </div>

            </div>

            <div id="membersPanel">

                {(props.members && props.currentUser) ? props.members.map(member => {
                    if (member._id.toString() !== props.currentUser.id.toString()) {
                        return (
                            <div className="memberPanel">
                                <div className="memberImageDiv">
                                    <BsPersonCircle color="#0eb2fc" size={"25px"} />
                                </div>

                                <div className="memberDiv">

                                    <div className="memberName">
                                        {member.username}
                                    </div>

                                    <div className="memberStatusBoxDiv">
                                        <p>{member.status}</p>
                                    </div>

                                </div>
                            </div>
                        )
                    } else {
                        return null
                    }
                }) : "Fetching members..."}

            </div>

        </div>

    )

}

export default MembersPanel