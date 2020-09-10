import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//components
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import EditTodo from "./components/EditTodo";
import NewTodo from "./components/NewTodo";
import NewUser from "./components/NewUser";

const App = () => {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={TodoList} />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/new" component={NewTodo} />
        <Route path="/user" component={NewUser} />
      </div>
    </Router>
  );
};

export default App;
