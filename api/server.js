// BUILD YOUR SERVER HERE
//imports
const express = require('express');
const User = require('./users/model.js');

//instance of express app
const server = express();

//global middleware
server.use(express.json())

// [GET] /api/users	
server.get('/api/users', (req,res) =>{
    User.find()
    .then(users => {
        console.log('users:', users)
        res.status(200).json(users)
    })
    .catch(err => {
        console.error('Gerr:', err)
        res.status(500).json({message: "the users information could not be retrieved"})
    })
})


// [GET] /api/users/:id	
server.get('/api/users/:id', (req,res) =>{
    const {id} = req.params
    User.findById(id)
    .then(user => {
        console.log('user:', user)
        res.status(200).json(user)
    })
    .catch(err => {
        console.error('GIerr:', err)
        res.status(500).json({message: err.message})
    })
})

// [POST] /api/users	
server.post('/api/users', (req,res) => {
    const newUser = req.body
    if(!newUser.name || !newUser.bio){
        res.status(400).json({message: "Please provide name and bio for the user"})
    }else{
        User.insert(newUser)
        .then(user => {
            console.log('postUser:', user)
            res.status(201).json(user)
        })
        .catch(err => {
            console.error('Posterr:', err)
            res.status(500).json({message: "There was an error while saving the user to the databse."})
        })
    }
})
// [PUT] /api/users/:id	
server.put('/api/users/:id', async (req,res) => {
    try{ 
    const {id} = req.params;
    const changes = req.body;
    if(!changes.name || !changes.bio){
        res.status(400).json({message: "Please provide name and bio for user"})
    }else{
        const updatedUser = await User.update(id, changes)
        if(!updatedUser){
            res.status(404).json({message: "The user with the specified ID does not exist"})
    }else
        {res.status(201).json(updatedUser)}
    }
    }catch(err){
        console.error('PUTerr:', err)
        res.status(500).json({message: err.message})
    }
})
// [DELETE] /api/users/:id	
server.delete('/api/users/:id', async (req,res) => {
    try{ 
    const {id} = req.params;
    const deletedUser = await User.remove(id)
    console.log('deletedUser', deletedUser)
    if(!deletedUser){
        res.status(404).json({message: "The user with the specific ID does not exist."})
    }else{
            res.status(201).json(deletedUser)
        }
        }catch(err){
            console.error('DELETEerr', err)
            res.status(500).json({message: "The user could not be deleted"})
        }
    }
)



//exposing server to other modules
module.exports = server // EXPORT YOUR SERVER instead of {}
 