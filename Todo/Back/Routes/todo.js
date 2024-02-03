const express = require('express')
var router = express.Router();
const todoConttller = require('../Controllers/todo')

router.post("/createTodo",todoConttller.createTodo);

router.get("/", todoConttller.getTodo);

router.patch("/updateTodo/:id",  todoConttller.updateTodo);
// get by id
router.get("", todoConttller.getTodoByID);
// get all orders
// delete order by id
router.delete("/deleteTodo/:id",  todoConttller.deleteTodoeById);

module.exports = router;
