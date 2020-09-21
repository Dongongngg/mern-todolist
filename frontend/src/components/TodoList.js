import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//
import * as todoAPI from "../api/todoAPI";
//
import "../styles/TodoList.css";

const Loading = () => {
  return (
    <div class="d-flex my-3 justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
};
const NoResults = () => {
  return (
    <h4 style={{ textAlign: "center" }}>
      {"No results, create "}
      <Link to="/new">new todo</Link> {" ?"}
    </h4>
  );
};

const TodoList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isNoResults, setIsNoResults] = useState(false);
  const [lists, setLists] = useState([]);
  const [filterLists, setFilterLists] = useState([]);
  const [filterInputs, setFilterInputs] = useState("");

  //filter
  const handleFilter = (event) => {
    setFilterInputs(event.target.value);
  };
  useEffect(() => {
    if (filterInputs === "") {
      setFilterLists(lists);
    } else {
      setFilterLists(
        lists.filter(
          (e) =>
            e.username
              .toLowerCase()
              .includes(filterInputs.toLocaleLowerCase()) ||
            e.description
              .toLowerCase()
              .includes(filterInputs.toLocaleLowerCase())
        )
      );
    }
  }, [filterInputs]);

  useEffect(() => {
    if (filterLists.length === 0) {
      setIsNoResults(true);
    } else {
      setIsNoResults(false);
    }
  }, [filterLists]);

  //load initial list
  useEffect(() => {
    const getList = async () => {
      let res = await todoAPI.getAll();
      setLists(res);
      setFilterLists(res);
    };
    getList();
    setIsLoading(false);
  }, []);

  //delete btn
  const handleDelete = async (id) => {
    let res = await todoAPI.deleteById(id);
    const getList = async () => {
      let res = await todoAPI.getAll();
      setLists(res);
      setFilterLists(res);
    };
    getList();
  };

  return (
    <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-search"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
              />
              <path
                fillRule="evenodd"
                d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
              />
            </svg>
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Filter..."
          onChange={handleFilter}
        ></input>
      </div>

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
                Manage
              </th>
            </tr>
          </thead>
          <tbody>
            {lists.length > 0
              ? filterLists.map((list, i) => (
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
        {isLoading ? <Loading /> : isNoResults ? <NoResults /> : null}
      </div>
    </div>
  );
};

export default TodoList;
