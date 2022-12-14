import React, { useState, useEffect } from "react";
import ListForm from "./ListForm";
import List from "./List";
import "./GroceryList.css";
import axios from "axios";

function GroceryList(props) {
  const [items, setItems] = useState([]);

  const getItems = () => {
    const config = {
      url: "http://localhost:3001/groceries",
      method: "get",
      withCredentials: true,
    };

    axios
      .request(config)
      .then((res) => {
        const resData = res.data;

        // Update the tasks state with the complete item of tasks retrieved from the server
        setItems(resData);
      })
      .catch((err) => {
        console.log(err.status);
      });
  };

  useEffect(() => {
    getItems();
  }, []);

  const generateUniqueId = () => {
    return Date.now() + Math.random();
  };

  const addItems = (item) => {
    // Generate a unique id for the new task
    const id = generateUniqueId();

    // Create a new task object with the id and text
    const newItem = {
      _id: id,
      content: item.text,
    };

    const newItems = [newItem, ...items];

    // Update the tasks state with the new array
    setItems(newItems);
    createItems(item.text);
  };

  const createItems = (item) => {
    console.log(item);

    const config = {
      url: "http://localhost:3001/groceries",
      method: "post",
      withCredentials: true,
      data: {
        content: item,
      },
    };

    axios
      .request(config)
      .then((res) => {
        console.log(res);
        props.onSubmit();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeItems = (id) => {
    console.log("Removing item with id: ", id);
    const removeArr = [...items].filter((item) => item._id !== id);
    setItems(removeArr);
    const config = {
      url: `http://localhost:3001/groceries/${id}`,
      method: "delete",
      withCredentials: true,
    };
    axios
      .request(config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="itemspage-container">
      <div className="item-header">
        <h1>Grocery List</h1>
      </div>
      <div className="items-container text-center">
        <List items={items} removeItems={removeItems} />
      </div>
      <div className="item-form-container">
        <ListForm onSubmit={addItems} />
      </div>
    </div>
  );
}

export default GroceryList;
