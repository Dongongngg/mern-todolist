const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("User added"))
    .catch((err) => res.status(400).json("Error :" + err));

  // newUser
  //   .save()
  //   .then(() => res.json({ Success: true, Msg: "User added" }))
  //   .catch((err) => {
  //     if (err.name === "MongoError" && err.code === 11000) {
  //       res.status(400).send({ Success: false, Msg: "User exist" });
  //     }
  //     res.status(400).send({ Success: false, Msg: err });
  //   });

  // newUser.save((err) => {
  //   if (err) {
  //     if (err.name === "MongoError" && err.code === 11000) {
  //       res.status(400).json({ Success: false, Msg: "User exist" });
  //     }
  //     res.status(400).json({ Success: false, Msg: err });
  //   } else {
  //     res.json({ Success: true, Msg: "User added" });
  //   }
  // });
});
//delete by id
router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
