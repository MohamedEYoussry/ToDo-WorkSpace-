const express = require('express')
var router = express.Router();
const noteConttller = require('../Controllers/note')

router.post("/createNote",noteConttller.createNote);

router.get("/", noteConttller.getnotes);

router.patch("/updateNote/:id",  noteConttller.updateNote);

router.get("/:id", noteConttller.getNoteByID);

router.delete("/deleteNote/:id",  noteConttller.deleteNoteById);

module.exports = router;
