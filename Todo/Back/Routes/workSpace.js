const express = require('express');
const router = express.Router();
const workspaceController = require('../Controllers/workSpace');

// Create a todo in a workspace
router.post('/createTodo', workspaceController.createTodo);

// Get all todos in a workspace
router.get('/', workspaceController.getTodo);

// Update a todo in a workspace by ID
router.patch('/updateworkspace/:id', workspaceController.updateTodo);

// Get a specific todo in a workspace by ID
router.get('/:id', workspaceController.getTodoByID);

// Delete a todo in a workspace by ID
router.delete('/deleteworkspace/:id', workspaceController.deleteTodoeById);

// Add a member to a workspace
router.post('/add-member', workspaceController.addMemberToWorkspace);

// Remove a member from a workspace
router.post('/remove-member/:id', workspaceController.removeMemberFromWorkspace);

// Update a todo in a workspace by member
router.put('/member-todos/:id', workspaceController.updateTodoByMember);

router.patch('/addMember/:todoId', workspaceController.addNewMember);


module.exports = router;
