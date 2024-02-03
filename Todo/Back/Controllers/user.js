const userModel = require("../Models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createUser(req, res, next) {
    try {
        var newUser = await userModel.create(req.body);
        res.status(200).json(newUser);
    } catch (err) {
        res.status(422).json(err.message);
    }
}
// Login

async function login(req, res) {
    var { email, password } = req.body;
    var user = await userModel.findOne({ email }); // {email:email}
    if (user) {
      var valid = bcrypt.compareSync(password, user.password);
      if (valid) {
        // generate Token
        var token = jwt.sign(
          {
            userId: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.SECRET,
          { expiresIn: "1h" }
        );
     
        res.status(200).json(token);
        console.log(token);
      } else {
        res.status(401).json({ message: "invalid email or password" });
      }
    } else {
      res.status(401).end();
    }
  }
//get all notes
async function getUsers(req, res, next) {
    try {


        const allUsers = await userModel.find();
        if (allUsers.length > 0) {
            res.status(200).json(allUsers);
        } else {
            res.json({ msg: "No Users found" })
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
}
// update order by id 
async function updateUser(req, res) {
    var id = req.params.id;
    const newData = req.body;
    try {
        const updatedUser = await userModel.updateOne({ _id: id }, newData)
        res.status(200).json(updatedUser);

    } catch (err) {
        res.status(500).json(err.message);
    }
}
async function getUserByID(req, res) {
    try {
        const User = await userModel.findById(req.params.id);
        if (!User) return res.status(404).send('User not found');
        res.send(User);
    } catch (err) {
        res.status(422).json(err);
    }
}
async function deleteUserById(req, res, next) {
    // console.log("/////////////////////////////////////")
    // console.log(req.userId)

    try {
        const userId = req.params.id;

        const found = await userModel.findById(userId);
        if (found.userId == req.userId) {
            const deleteUser = await userModel.findByIdAndDelete(userId);
            res.status(200).json(" User has been deleted");
        } else {
            res.status(422).json("Can't find user");
        }
    } catch (err) {
        res.status(422).json(err);
    }
}



module.exports = {
    createUser,
    deleteUserById,
    updateUser,
    getUserByID,
    getUsers,
    login
};