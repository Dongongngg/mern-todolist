import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//
import * as userAPI from "../api/userAPI";

const NewTodo = () => {
  const [todo, setTodo] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
  });
  const [userLists, setUserLists] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      let res = await userAPI.getAll();
      setUserLists(res);
    };
    getUsers();
  }, []);

  const handleInput = (event) => {
    const value = event.target.value;
    setTodo({ ...todo, [event.target.name]: value });
  };

  const handleInputDate = (date) => {
    setTodo({ ...todo, date: date });
  };

  const handleSubmit = () => {
    console.log(todo);
  };

  return (
    <div>
      {console.log(userLists)}
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="user">
            User
          </label>
        </div>
        <select
          className="custom-select"
          id="user"
          name="username"
          value={todo.username}
          onChange={handleInput}
        >
          {userLists.map((user) => (
            <option value={user.username} key={user._id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>
      <label htmlFor="basic-url">Description</label>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          name="description"
          value={todo.description}
          onChange={handleInput}
        ></input>
      </div>
      <label htmlFor="basic-url">Duration</label>
      <div className="input-group mb-3">
        <input
          type="number"
          className="form-control"
          name="duration"
          value={todo.duration}
          onChange={handleInput}
        ></input>
      </div>
      <label htmlFor="basic-url">Date</label>
      <div className="input-group mb-3">
        <DatePicker selected={todo.date} onChange={handleInputDate} />
      </div>

      <div className="button-box">
        <button type="button" className="btn btn-dark" onClick={handleSubmit}>
          submit
        </button>
      </div>
    </div>
  );
};

export default NewTodo;
