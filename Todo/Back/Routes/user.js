const express = require('express')
var router = express.Router();
const userConttller = require('../Controllers/user')

router.post("/createUser", userConttller.createUser);

router.get("/", userConttller.getUsers);

router.patch("/updateUser/:id", userConttller.updateUser);
// get by id
router.get("/:id", userConttller.getUserByID);
//login
router.post("/login", userConttller.login);
// get all orders
// delete order by id
router.delete("/deleteUser/:id", userConttller.deleteUserById);

module.exports = router;
