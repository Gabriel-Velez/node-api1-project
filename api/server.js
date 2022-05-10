// BUILD YOUR SERVER HERE
const express = require("express");
const User = require("./users/model");

const server = express();
server.use(express.json());

server.get("/api/users", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({
        message: "users not found",
        err: err.message,
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user == null)
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        });
      else res.json(user);
    })
    .catch((err) => {
      res.status(500).json({
        message: "user not found",
        err: err.message,
      });
    });
});

server.post("/api/users", (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio)
    res.status(400).json({
      message: "Please provide name and bio for the user",
    });
  else
    User.insert(user)
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        res.status(500).json({
          message: "users not found",
          err: err.message,
        });
      });
});

server.put("/api/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user == null)
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        });
      else if (!req.body.name || !req.body.bio)
        res.status(400).json({
          message: "Please provide name and bio for the user",
        });
      else {
        const updatedUser = User.update(req.params.id, req.body);
        res.status(200).json(updatedUser);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "user not found",
        err: err.message,
      });
    });
});

server.delete("/api/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user == null)
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        });
      else {
        res.status(200).json(user);
        User.remove(req.params.id);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "user not found",
        err: err.message,
      });
    });
});

server.use("*", (req, res) => {
  res.status(404).json({
    message: "not found",
  });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
