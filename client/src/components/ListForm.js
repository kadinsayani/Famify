import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ListForm.css";

function ListForm(props) {
    const [input, setInput] = useState("");
  
    const focus = useRef(null);
    useEffect(() => {
      focus.current.focus();
    });
  
    const handleChange = (e) => {
      setInput(e.target.value);
    };

    const createList = (post) => {
        axios.post("http://localhost:3001/list", post).then((res) => {
          console.log(res);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input,
        });
    
        createList({ content: input });
    
        setInput("");
    };

    return (
        <div className="listform-body">
            <form className="list-form" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Add a name for the list"
                    value={input}
                    name="text"
                    className="list-input"
                    onChange={handleChange}
                    ref={focus}
                />
                <br />
                <button className="list-button">Create New List</button>
            </form>
        </div>
    );
}

export default ListForm;

