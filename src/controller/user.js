const User = require("../models/user");

exports.getUsers = (req, res) => {
  User.find({}).exec((error, users) => {
    if (error) return res.status(400).json({ error });
    if (users) {
      res.status(200).json({ users });
    }
  });
};

exports.deleteUserById = (req, res) => {
  console.log(req.body.payload);
  const { _id } = req.body.payload;
  if (_id) {
    User.deleteOne({ _id: _id }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  } else {
    res.status(400).json({ error: "Params required" + _id });
  }
};
