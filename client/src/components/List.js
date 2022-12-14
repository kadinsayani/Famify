import React from "react";
import { RiCheckFill } from "react-icons/ri";
import "./List.css";

function List({ items, removeItems }) {
  return items.map((item, index) => (
    <div>
      <div className="list-row">
        {item.content}
        <div className="icons">
          <RiCheckFill
            onClick={() => removeItems(item._id)}
            className="delete-icon"
          />
        </div>
      </div>
    </div>
  ));
}

export default List;
