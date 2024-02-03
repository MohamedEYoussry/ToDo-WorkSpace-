const express = require("express");
const app = express();
var cors = require("cors");
app.use(express.json());


var NoteRoutes = require('./Routes/note')
var TodoRoutes = require('./Routes/todo')
var UserRoutes = require('./Routes/user')
var WorkspaceRoutes = require('./Routes/workSpace')
app.use(cors());



const port = process.env.PORT || 4002;
require("dotenv").config();
// console.log(`process.env`);
const dbConnection = require("./DB/connection");
dbConnection();


app.use("/Notes", NoteRoutes);
app.use("/Todos", TodoRoutes);
app.use("/Users", UserRoutes);
app.use("/workspace", WorkspaceRoutes);




app.use("*", (req, res) => {
    res.status(404).end("not found");
});

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(port, () => console.log(`app listening on port ${port}!`));