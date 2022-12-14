import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import "./List.css";

function List({ items, removeItems }) {
  return items.map((list, index) => (
    <div
      className={list.isComplete ? "list-row complete" : "list-row"}
      key={index}
    >
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeItems(list.id)}
          className="delete-icone"
        />
      </div>
    </div>
  ));
}

export default List;
