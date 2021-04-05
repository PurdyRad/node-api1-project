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
        res.status(500).json({message: err.message})
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
    User.insert(newUser)
    .then(user => {
        console.log('postUser:', user)
        res.status(201).json(user)
    })
    .catch(err => {
        console.error('Posterr:', err)
        res.status(500).json({message: err.message})
    })
})
// [PUT] /api/users/:id	
server.put('/api/users/:id', (req,res) => {
    const {id} = req.params;
    const changes = req.body;
    User.update(id, changes)
    .then(updatedUser => {
        console.log('putUser', updatedUser)
        res.status(201).json(updatedUser)
    })
    .catch(err => {
        console.error('PUTerr:', err)
        res.status(500).json({message: err.message})
    })
})
// [DELETE] /api/users/:id	
server.delete('/api/users/:id', (req,res) => {
    const {id} = req.params;
    User.remove(id)
    .then(gone => {
        console.log('deleteUser', gone)
        res.status(201).json(gone)
    })
    .catch(err => {
        console.error('DELETEerr', err)
        res.status(500).json({message: err.message})
    })
})



//exposing server to other modules
module.exports = server // EXPORT YOUR SERVER instead of {}
 