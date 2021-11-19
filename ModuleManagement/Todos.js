const express = require("express");
const Todos = require("../module/Todos");
const todosRouter = express.Router();

//Users data import
todosRouter.get("/", (req, res) => {
  Todos.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ message: err }));
});

//Users(Register new user) data creater
todosRouter.post("/createtodos", (req, res) => {
  const newTodos = new Todos({
    todo: req.body.todo,
    status: req.body.status,
    priority: req.body.priority,
  });

  newTodos
    .save()
    .then((data) =>
      res.send({ message: "Todos Created Succesfully", todo: newTodos })
    )
    .catch((err) => res.status(400).json({ message: err }));
});

//User profile Update
todosRouter.patch("/Todosupdate/:todosID", (req, res) => {
  Todos.updateOne(
    { _id: req.params.todosID },
    {
      $set: {
        todo: req.body.todo,
        status: req.body.status,
        priority: req.body.priority,
      },
    }
  )
    .then(() => res.status(200).json({ message: "Todos updated" }))
    .catch((err) => res.status(400).json({ message: err }));
});

//Profile remove(Delete)
todosRouter.delete("/deletetodos/:todosID", (req, res) => {
  Todos.remove({ _id: req.params.todosID })
    .then(() => res.send({ message: " Todos Deleted" }))
    .catch((err) => res.status(400).json({ message: err }));
});
module.exports = todosRouter;
