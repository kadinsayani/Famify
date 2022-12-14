import React, { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import '../components/MembersPanel.css'

function MembersPanel(props) {

    const [users, setUsers] = useState([])

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

                    <div id="statusBoxDiv">
                        <input id="statusBox" defaultValue={props.currentUser ? props.currentUser.status : ""} onSubmit={() => console.log("sa")} type="text"></input>
                    </div>
                    <button>Update Status</button>

                </div>

            </div>

        </div>

    )

}

export default MembersPanel