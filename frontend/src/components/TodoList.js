import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//
import * as todoAPI from "../api/todoAPI";

const TodoList = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let res = await todoAPI.getAll();
      setLists(res);
    };
    getList();
    console.log(lists);
  }, []);

  //delete
  const handleDelete = async (id) => {
    let res = await todoAPI.deleteById(id);
    const getList = async () => {
      let res = await todoAPI.getAll();
      setLists(res);
    };
    getList();
    console.log(lists);
  };

  return (
    <div>
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
                  <th scope="row">{list.username}</th>
                  <td>{list.description}</td>
                  <td>{list.date}</td>
                  <td>{list.duration}</td>
                  <td>
                    <Link to={`/edit/${list.id}`}>edit</Link>
                  </td>
                  <td onClick={() => handleDelete(list.id)}>Delete</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      {lists.length === 0 ? (
        <h4 style={{ textAlign: "center" }}>
          {"No todo in the database, create "}
          <Link to="/user">new user</Link> {" ?"}
        </h4>
      ) : null}
    </div>
  );
};

export default TodoList;
