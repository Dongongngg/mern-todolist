import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//
import * as userAPI from "../api/userAPI";
import * as todoAPI from "../api/todoAPI";

const NewTodo = () => {
  const [todo, setTodo] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
  });
  const [userLists, setUserLists] = useState([]);
  const [submitFlag, setSubmitFlag] = useState(false);
  const [successFlag, setSuccessFlag] = useState(false);

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

  const handleSubmit = async () => {
    setSubmitFlag(true);
    if (todo.username !== "" && todo.description !== "") {
      let res = await todoAPI.addNew(todo);
      console.log(res);
      if (res === "Todo added") {
        setTodo({
          username: "",
          description: "",
          duration: 0,
          date: new Date(),
        });
        setSuccessFlag(true);
        setSubmitFlag(false);
      }
    }
  };

  return (
    <div>
      <label htmlFor="basic-url">User *</label>
      <div className="input-group mb-3">
        <select
          className={
            "custom-select" +
            (submitFlag && todo.username === "" ? " is-invalid" : "")
          }
          id="user"
          name="username"
          value={todo.username}
          onChange={handleInput}
        >
          <option value={""}>Select user...</option>
          {userLists.map((user) => (
            <option value={user.username} key={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>
      <label htmlFor="basic-url">Description *</label>
      <div className="input-group mb-3">
        <input
          autoComplete="off"
          type="text"
          className={
            "form-control" +
            (submitFlag && todo.description === "" ? " is-invalid" : "")
          }
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

      <div className="button-box mt-5">
        <button type="button" className="btn btn-dark" onClick={handleSubmit}>
          submit
        </button>
        {successFlag ? (
          <div className="alert alert-success d-inline ml-3" role="alert">
            Todo added
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NewTodo;
