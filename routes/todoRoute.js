const express = require('express');
const Todo = require('../model/todo');

let router = express.Router();

router.get('/', async(req, res) => {
    
    const data = await Todo.find();
    console.log(data);
    res.send(data);
    
})

router.post('/', async (req, res) => {
    const todo = await new Todo({
        title: req.body.title 
    }).save();
    res.send(todo)
})

router.put("/:id", async (req, res) => {
    const todo = await Todo.updateOne({
        title: req.body.title
    });
    res.send(todo);
   
})

router.delete("/:id", async (req, res) => {
    const todo = await Todo.deleteOne({_id: req.params.id})
    res.send(todo);
   
})


module.exports = router;