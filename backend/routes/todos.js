const router = require("express").Router();
let Todo = require("../models/todo.model");

//get all
router.route("/").get((req, res) => {
  Todo.find()
    .then((todo) => res.json(todo))
    .catch((err) => res.status(400).json("Error: " + err));
});
//get by id
router.route("/:id").get((req, res) => {
  Todo.findById(req.params.id)
    .then((todo) => res.json(todo))
    .catch((err) => res.status(400).json("Error: " + err));
});
//delete by id
router.route("/:id").delete((req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(() => res.json("Todo deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});
//add
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const date = Date.parse(req.body.date);
  const duration = Number(req.body.duration);

  const newTodo = new Todo({ username, description, date, duration });

  newTodo
    .save()
    .then(() => res.json("Todo added"))
    .catch((err) => res.status(400).json("Error :" + err));
});
//update by id
router.route("/update/:id").post((req, res) => {
  Todo.findById(req.params.id)
    .then((todo) => {
      todo.username = req.body.username;
      todo.description = req.body.description;
      todo.date = req.body.date;
      todo.duration = req.body.duration;
      todo
        .save()
        .then(() => res.json("Todo updated"))
        .catch((err) => res.status(400).json("Error :" + err));
    })
    .catch((err) => res.status(400).json("Error :" + err));
});

module.exports = router;
