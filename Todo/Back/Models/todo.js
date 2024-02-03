const mongoose = require("mongoose")
const todoSchema = mongoose.Schema({
    title:{
        type: String,
        require:true,
    },
    todoContent:{
        type: String,
        require:true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    isDone: { type: Boolean, default: false }


}, { timestamps: true }) //timestamps add createdAt updatedAt

    const TodoModel = mongoose.model("todos", todoSchema) //create collection
    
    module.exports = TodoModel