import React, { useState } from "react";
import ListForm from "./ListForm";
import List from "./List";
import "./ListOfLists.css";

function ListOfLists() {
  const [lists, setLists] = useState([]);

  const addList = (list) => {
    const newLists = [list, ...lists];
    setLists(newLists);
  };

  const removeList = (id) => {
    const removeArr = [...lists].filter((list) => list.id !== id);
    setLists(removeArr);
  };

  const completeList = (id) => {
    let updatedLists = lists.map((list) => {
      if (list.id === id) {
        list.isComplete = !list.isComplete;
      }
      return list;
    });
    setLists(updatedLists);
  };

  const updateList = (listId, newValue) => {
    setLists((prev) =>
      prev.map((item) => (item.id === listId ? newValue : item))
    );
  };

  return (
    <div className="listspage-container">
      <div className="list-header">
        <h1>Lists</h1>
      </div>
      <div className="lists-container text-center">
        <List
          lists={lists}
          completeList={completeList}
          removeList={removeList}
          updateList={updateList}
        />
      </div>
      <div className="list-form-container">
        <ListForm onSubmit={addList} />
      </div>
    </div>
  );
}

export default ListOfLists;