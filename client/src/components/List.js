import React, { useState } from "react";
import ListForm from "./ListForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import "./List.css";

function List({ lists, completeList, removeList, updateList }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });
  const submitUpdate = (value) => {
    updateList(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };
  if (edit.id) {
    return <ListForm edit={edit} onSubmit={submitUpdate} />;
  }
  return lists.map((list, index) => (
    <div
      className={list.isComplete ? "list-row complete" : "list-row"}
      key={index}
    >
      <div key={list.id} onClick={() => completeList(list.id)}>
        {list.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeList(list.id)}
          className="delete-icone"
        />
        <TiEdit
          onClick={() => setEdit({ id: list.id, value: list.text })}
          className="edit-icone"
        />
      </div>
    </div>
  ));
}

export default List;