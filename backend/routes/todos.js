const router = require("express").Router();
let Todo = require("../models/todo.model");

router.route("/").get((req, res) => {
  Todo.find()
    .then((todos) => res.json(todos))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const date = Date.parse(req.body.date);
  const duration = Number(req.body.duration);

  const newTodo = new User({ username, description, date, duration });

  newTodo
    .save()
    .then(() => res.json("Todo added"))
    .catch((err) => res.status(400).json("Error :" + err));
});

module.exports = router;
