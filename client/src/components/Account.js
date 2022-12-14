import React, { useEffect, useState } from "react";
import "./Account.css";
import axios from "axios";
import { BsPersonCircle } from "react-icons/bs";
import { IconContext } from "react-icons/lib";

function Account() {
  const [user, setUser] = useState({});
  const getUser = () => {
    const config = {
      url: "http://localhost:3001/userinfo",
      method: "get",
      withCredentials: true,
    };

    axios
      .request(config)
      .then((res) => {
        const resData = res.data;
        setUser({ name: resData.username, joinCode: resData.joinCode });
      })
      .catch((err) => {
        console.log(err.status);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <div className="account-container">
        <div className="account-header">
          <h1>Account</h1>
        </div>
        <div className="account-body">
          <IconContext.Provider value={{ color: "#0eb2fc", size: "70px" }}>
            <h1>
              <BsPersonCircle />
            </h1>
          </IconContext.Provider>
          <p><b>Username: </b>{user.name}</p>
          <br/>
          <p><b>Family code: </b>{user.joinCode ? user.joinCode.substring(18) : ""}</p>
          <p></p><br></br>
          <div className="account-footer">
          
          <p>Share the Family Code above with members of your family.<br></br>
          When they join Famify using your Family code, they will automatically be added to this group.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
