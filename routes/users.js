const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(async (req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });

  const isExisted = await User.findOne({ username: username }, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Result---------------------------------------: ", res);
      return res;
    }
  });
  console.log(isExisted);
  if (isExisted === null) {
    newUser
      .save()
      .then(() => res.status(200).json("User added"))
      .catch((err) => res.status(400).json("Error :" + err));
  } else {
    return res.status(409).json("User existed!");
  }
});
//delete by id
router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
