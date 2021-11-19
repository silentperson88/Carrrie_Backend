const express = require("express");
const Users = require("../module/Users");
const userRouter = express.Router();
const mongoose = require("mongoose");

//Users data import
userRouter.get("/", (req, res) => {
  Users.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ message: err }));
});

//Login
userRouter.post("/Login", (req, res) => {
  const { userName, password } = req.body;
  Users.findOne({ userName: userName }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "login sucess", user: user });
      } else {
        res.send({ message: "wrong credentials" });
      }
    } else {
      res.send("not register");
    }
  });
});

userRouter.post("/Register", (req, res) => {
  console.log(req.body);
  const { name, userName, password } = req.body;
  Users.findOne({ userName: userName }, (err, user) => {
    if (user) {
      res.send({ message: "user already exist" });
    } else {
      const newuser = new Users({ name, userName, password });
      newuser.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Register sucessfull", user: newuser });
        }
      });
    }
  });
});

//Users(Register new user) data creater
userRouter.post("/createuser", (req, res) => {
  const newUsers = new Users({
    name: req.body.name,
    userName: req.body.userName,
    password: req.body.password,
  });

  newUsers
    .save()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ message: err }));
});

//User profile Update
userRouter.patch("/userprofileupdate/:userID", (req, res) => {
  Users.updateOne(
    { _id: req.params.userID },
    {
      $set: {
        name: req.body.name,
        userName: req.body.userName,
        password: req.body.password,
      },
    }
  )
    .then(() => res.status(200).json({ message: "Users Profile updated" }))
    .catch((err) => res.status(400).json({ message: err }));
});

//Profile remove(Delete)
userRouter.delete("/deleteuserprofile/:userID", (req, res) => {
  Users.remove({ _id: req.params.userID })
    .then(() => res.status(200).json({ message: " User Profile Deleted" }))
    .catch((err) => res.status(400).json({ message: err }));
});
module.exports = userRouter;
