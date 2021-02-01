const express = require('express');
const Todo = require('../model/todo');

let router = express.Router();

router.get('/', async(req, res) => {
    
    const data = await Todo.find();
    console.log(data);
    res.render('index.ejs', {data:data, error:"empty"})
    
})

router.post('/', async (req, res) => {
    const todo = await new Todo({
        task: req.body.task 
    }).save();
    res.redirect('/');
})

router.get("/edit/:id", async (req, res) => {
    const todo = await Todo.findOne({
        id: req.params.id
    });
    res.render('todo-edit.ejs', {todo:todo})
   
})

router.post("/edit", async (req,res) => {
    
    console.log(req.query)
    await Todo.updateOne({_id:req.body.id}, {task: req.body.task})
    
    res.redirect("/")
})

router.get("/delete/:id", async (req, res) => {
    await Todo.deleteOne({_id: req.params.id})
    res.redirect('/');
    
})


module.exports = router;