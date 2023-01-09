const express = require("express");
const { deleteUserById, getUsers } = require("../controller/user");
const router = express.Router();
const User = require("../models/user");
const { requireSignin, adminMiddleware } = require("../common_middleware");

router.post("/signin", (req, res) => {});

router.post("/signup", (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered",
      });

    const { firstName, lastName, email, password } = req.body;
    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
    });
    _user.save((error, data) => {
      console.log(error);
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }

      if (data) {
        return res.status(201).json({
          user: data,
        });
      }
    });
  });
});

router.get("/user/getusers", getUsers);

router.delete(
  "/user/deleteUserById",
  requireSignin,
  adminMiddleware,
  deleteUserById
);

module.exports = router;
