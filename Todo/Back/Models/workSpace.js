const mongoose = require("mongoose")
const workSpaceSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    todoContent: {
        type: String,
        require: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }],

}, { timestamps: true }) //timestamps add createdAt updatedAt

const workSpaceModel = mongoose.model("workspace", workSpaceSchema) //create collection

module.exports = workSpaceModel