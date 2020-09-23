import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//
import * as userAPI from "../api/userAPI";
//
import "../styles/TodoList.css";

const UserList = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let res = await userAPI.getAll();
      setLists(res);
    };
    getList();
  }, []);

  //delete
  const handleDelete = async (id) => {
    await userAPI.deleteById(id);
    const getList = async () => {
      let res = await userAPI.getAll();
      setLists(res);
    };
    getList();
    console.log(lists);
  };

  return (
    <div className="table-responsive-md">
      <table className="table table-hover">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">User</th>
            <th scope="col">Description</th>
            <th scope="col">Date</th>
            <th scope="col">Duration</th>
            <th scope="col" colSpan="2">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {lists.length > 0
            ? lists.map((list, i) => (
                <tr key={list.id}>
                  <td>{i + 1}</td>
                  <td>{list.username}</td>
                  <td>{list.description}</td>
                  <td>{list.date}</td>
                  <td>{list.duration}</td>
                  <td>
                    <Link to={`/edit/${list.id}`}>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleDelete(list.id)}
                      >
                        Update
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleDelete(list.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
