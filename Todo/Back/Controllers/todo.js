const todoModel = require("../Models/todo")

//create note 
async function createTodo(req, res, next) {
    try {
        var newTodo = await todoModel.create(req.body);
        //   console.log(req.body);
        res.status(200).json(newTodo);
        //   console.log(newnote)
        //   console.log(res);
    } catch (err) {
        res.status(422).json(err.message);
    }
}
//get all notes
async function getTodo(req, res, next) {
    try {


        const allTodos = await todoModel.find();
        if (allTodos.length > 0) {
            res.status(200).json(allTodos);
        } else {
            res.json({ msg: "No Todos found" })
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
}
// update order by id 
async function updateTodo(req, res) {
    var id = req.params.id;
    const newData = req.body;
    try {
        const updatedTodo = await todoModel.updateOne({ _id: id }, newData)
        res.status(200).json(updatedTodo);

    } catch (err) {
        res.status(500).json(err.message);
    }
}
async function getTodoByID(req, res) {
    try {
        const Todo = await todoModel.findById(req.params.id);
        if (!Todo) return res.status(404).send('Todo not found');
        res.send(Todo);
    } catch (err) {
        res.status(422).json(err);
    }
}
async function deleteTodoeById(req, res, next) {
    // console.log("/////////////////////////////////////")
    console.log(req.userId)

    try {
        const todoId = req.params.id;

        const found = await todoModel.findById(todoId);
        if (found.todoId == req.todoId) {
            const deleteTodo = await todoModel.findByIdAndDelete(todoId);
            res.status(200).json("your Todo has been deleted");
        } else {
            res.status(422).json("this Todo not belong to you");
        }
    } catch (err) {
        res.status(422).json(err);
    }
}



module.exports = {
    createTodo,
    updateTodo,
    deleteTodoeById,
    getTodo,
    getTodoByID
};