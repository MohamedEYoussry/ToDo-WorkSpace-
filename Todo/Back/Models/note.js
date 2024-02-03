const mongoose = require("mongoose")
const noteSchema = mongoose.Schema({
    title:{
        type: String,
        require:true,
    },
    noteContent:{
        type: String,
        require:true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },



}, { timestamps: true }) //timestamps add createdAt updatedAt

    const NotesModel = mongoose.model("notes", noteSchema) //create collection
    
    module.exports = NotesModel