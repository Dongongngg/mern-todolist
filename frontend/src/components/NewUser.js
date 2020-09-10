import React, { useState } from "react";
//
import * as userAPI from "../api/userAPI";
const NewUser = () => {
  const [user, setUser] = useState({
    username: "",
  });

  const handleInput = (event) => {
    const value = event.target.value;
    setUser({ ...user, [event.target.name]: value });
  };

  const handleSubmit = () => {
    console.log(user);
    userAPI.addNew(user);
  };

  return (
    <div>
      <label htmlFor="basic-url">Username</label>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          name="username"
          value={user.username}
          onChange={handleInput}
        ></input>
      </div>

      <div className="button-box">
        <button type="button" className="btn btn-dark" onClick={handleSubmit}>
          submit
        </button>
      </div>
    </div>
  );
};

export default NewUser;
