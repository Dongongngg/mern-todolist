import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [collapse, setCollapse] = useState(false);

  const handleCollapse = () => {
    setCollapse(!collapse);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        To Do List
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" onClick={handleCollapse}></span>
      </button>
      <div
        className={"collapse navbar-collapse" + (collapse ? " show" : "")}
        id="navbarNavAltMarkup"
      >
        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            Todo List
          </Link>
          <Link className="nav-link" to="/new">
            New Todo
          </Link>
          <Link className="nav-link" to="/user">
            New User
          </Link>
          <Link className="nav-link" to="/edit/:id">
            User List
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
