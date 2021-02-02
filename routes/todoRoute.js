const express = require('express');
const Todo = require('../model/todo');

let router = express.Router();

router.get('/', async(req, res) => {
    
    const data = await Todo.find();
    console.log(data);
    res.render('index.ejs', {data:data, error:"empty"})
    
})

router.post('/', async (req, res) => {
    await new Todo({
        task: req.body.task 
    }).save();
    res.redirect('/');
})

router.get("/edit/:id", async (req, res) => {
    
    const data = await Todo.find();
    const id = req.params.id;
    
    res.render('todo-edit.ejs', {data:data, id:id})
    
})

router.post("/edit/:id", async (req,res) => {
    const id = req.params.id;

    await Todo.findByIdAndUpdate(id, {task: req.body.task}, () => {  
        res.redirect("/")
    })
    
   
})

router.get("/remove/:id", async (req, res) => {
    const id = req.params.id;
    await Todo.findByIdAndRemove(id, {task: req.body.task}, () => {  
        res.redirect("/")
    })
    
})


module.exports = router;