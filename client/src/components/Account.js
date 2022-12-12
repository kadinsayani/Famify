import React, { useEffect, useState } from "react";
import "./Account.css";
import axios from "axios";

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
      <div className="account-page">
        <h1>Account</h1>
        <p>Username:{user.name}</p>
        <p>Family code:{user.joinCode}</p>
      </div>
    </div>
  );
}

export default Account;
