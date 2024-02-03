const workspaceModel = require ('../Models/workSpace')

//create note 
async function createTodo(req, res, next) {
    try {
        var newTodo = await workspaceModel.create(req.body);
        res.status(200).json(newTodo);
    } catch (err) {
        res.status(422).json(err.message);
    }
} 
//get all notes
async function getTodo(req, res, next) {
    try {


        const allTodos = await workspaceModel.find();
        if (allTodos.length > 0) {
            res.status(200).json(allTodos);
        } else {
            res.json({ msg: "No Todos found" })
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
}
async function updateTodo(req, res) {
    var id = req.params.id;
    const newData = req.body;
    try {
        const updatedTodo = await workspaceModel.updateOne({ _id: id }, newData)
        res.status(200).json(updatedTodo);

    } catch (err) {
        res.status(500).json(err.message);
    }
}
async function getTodoByID(req, res) {
    try {
        const Todo = await workspaceModel.findById(req.params.id);
        if (!Todo) return res.status(404).send('Todo not found');
        res.send(Todo);
    } catch (err) {
        res.status(422).json(err);
    }
}
async function deleteTodoeById(req, res, next) {
    console.log(req.userId)

    try {
        const todoId = req.params.id;

        const found = await workspaceModel.findById(todoId);
        if (found.todoId == req.todoId) {
            const deleteTodo = await workspaceModel.findByIdAndDelete(todoId);
            res.status(200).json("your Todo has been deleted");
        } else {
            res.status(422).json("this Todo not belong to you");
        }
    } catch (err) {
        res.status(422).json(err);
    }
            
}
async function addMemberToWorkspace(req, res) {
    try {
        const workspaceId = req.params.workspaceId;
        const memberToAdd = req.body.memberId; // Assuming you'll provide the memberId in the request body

        const workspace = await workSpaceModel.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }

        // Check if the requester is the Creator of the workspace
        if (String(workspace.Creator) !== String(req.user._id)) {
            return res.status(403).json({ message: 'You do not have permission to add members' });
        }

        // Add the member to the workspace's member field
        workspace.members.push(memberToAdd);
        await workspace.save();
    
        res.status(200).json({ message: 'Member added to workspace' });
    } catch (err) {
        res.status(500).json(err.message);
    }
}
async function removeMemberFromWorkspace(req, res) {
    try {
        const workspaceId = req.params.workspaceId;

        const workspace = await workSpaceModel.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }

        if (String(workspace.Creator) !== String(req.user._id)) {
            return res.status(403).json({ message: 'You do not have permission to remove members' });
        }

        workspace.members.pull(memberToRemove);
        await workspace.save();
    
        res.status(200).json({ message: 'Member removed from workspace' });
    } catch (err) {
        res.status(500).json(err.message);
    }
}
async function updateTodoByMember(req, res) {
    const workspaceId = req.params.workspaceId;
    const todoId = req.params.todoId;
    const newData = req.body;

    try {
        const workspace = await workSpaceModel.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }

        const isCreator = String(workspace.Creator) === String(req.user._id);
        const isMember = workspace.members.includes(req.user._id);

        if (!isCreator && !isMember) {
            return res.status(403).json({ message: 'You do not have permission to update todos in this workspace' });
        }

        const updatedTodo = await workspaceModel.findByIdAndUpdate(todoId, newData, { new: true });
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

async function addNewMember (req, res) {
        const { todoId } = req.params;
        const { memberId } = req.body;
      
        try {
          const todo = await Todo.findById(todoId);
      
          if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
          }
      
          if (req.user.userId !== todo.creator) {
            return res.status(403).json({ message: 'Unauthorized' });
          }
      
          todo.members.push(memberId);
          await todo.save();
      
          res.json({ message: 'Member added successfully' });
        } catch (error) {
          console.error('Error adding member:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      }





module.exports = {
    createTodo,
    updateTodo,
    deleteTodoeById,
    getTodo,
    getTodoByID,addMemberToWorkspace ,updateTodoByMember,removeMemberFromWorkspace,addNewMember

};