const noteModel = require ("../Models/note")

//create note 
async function createNote(req, res, next) {
    try {
      var newnote = await noteModel.create(req.body);
    //   console.log(req.body);
      res.status(200).json(newnote);
    //   console.log(newnote)
    //   console.log(res);
    } catch (err) {
      res.status(422).json(err.message);
    }
  }
  //get all notes
async function getnotes(req, res, next) {
    try {

        
      const allNotes = await noteModel.find();
      if (allNotes.length > 0){
      res.status(200).json(allNotes);
    } else {
      res.json({msg : "No Notes found"})
    }
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
  // update order by id 
async function updateNote(req, res) {
    var id = req.params.id;
    const newData = req.body;
    try{
        const updatedNote = await noteModel.updateOne({_id:id}, newData)
        res.status(200).json(updatedNote);

    }catch(err){
        res.status(500).json(err.message);
    }
}
async function getNoteByID(req, res) {
    try {
        const Note = await noteModel.findById(req.params.id);
    if (!Note) return res.status(404).send('Note not found');
    res.send(Note);
    } catch (err) {
        res.status(422).json(err);
    }
}
async function deleteNoteById(req, res,next) {
    console.log("/////////////////////////////////////")
    console.log(req.userId)

    try {
        const noteId  = req.params.id;
        
        const found = await noteModel.findById(noteId);
        if (found.noteId == req.noteId) {
            const deleteNote = await noteModel.findByIdAndDelete(noteId);
            res.status(200).json("your Note has been deleted");
        } else {
            res.status(422).json("this Note not belong to you");
        }
    } catch (err) {
        res.status(422).json(err);
    }
}



  module.exports = {
  createNote,
  getnotes,updateNote,getNoteByID,deleteNoteById
  };