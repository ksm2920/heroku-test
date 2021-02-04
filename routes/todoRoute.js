const express = require('express');
const Todo = require('../model/todo');

let router = express.Router();

router.get('/', async(req, res) => {
    
    const sorted = +req.query.sorted || 1;
    const page = +req.query.page || 1;
    
    
    const totalData = await Todo.find().countDocuments();
    
    const dataToShowPerPage = 2;
    
    const totalDataPart = Math.ceil(totalData/dataToShowPerPage)
    
    const dataToShow = dataToShowPerPage * page
    
    const data = await Todo.find().limit(dataToShow).sort({date: sorted})
    
    res.render('index.ejs', {data, totalData, totalDataPart, dataToShow, dataToShowPerPage, error:"empty"})   
})

router.post('/', async (req, res) => {
    const page = +req.query.page || 1;

    const dataToShowPerPage = 2;
    const dataToShow = dataToShowPerPage * page

    await new Todo({
        task: req.body.task 
    }).save();
    
    await Todo.find().limit(dataToShow)
    
    res.redirect("/");
    
})

router.get("/edit/:id", async (req, res) => {
    
    // const data = await Todo.find();
    const id = req.params.id;

    const sorted = +req.query.sorted || 1;
    const page = +req.query.page || 1;
    
    
    const totalData = await Todo.find().countDocuments();
    
    const dataToShowPerPage = 2;
    
    const totalDataPart = Math.ceil(totalData/dataToShowPerPage)
    
    const dataToShow = dataToShowPerPage * page
    
    const data = await Todo.find().limit(dataToShow).sort({date: sorted})
    
    res.render('todo-edit.ejs', {data, totalData, totalDataPart, dataToShow, dataToShowPerPage, id:id})
    
})

router.post("/edit/:id", async (req,res) => {
    const id = req.params.id;
    
    const totalData = await Todo.find().countDocuments();
    const dataToShowPerPage = 2;
    const totalDataPart = Math.ceil(totalData/dataToShowPerPage);

    await Todo.findByIdAndUpdate(id, {task: req.body.task}, () => {  
        Todo.find().countDocuments();
        res.redirect("/?page=" + totalDataPart)
    })     
    
})

router.get("/remove/:id", async (req, res) => {
    const id = req.params.id;

    const totalData = await Todo.find().countDocuments();
    const dataToShowPerPage = 2;
    const totalDataPart = Math.ceil(totalData/dataToShowPerPage);
    console.log(totalDataPart)

    await Todo.findByIdAndRemove(id, {task: req.body.task}, () => {  
        res.redirect("/?page=" + totalDataPart)
    })
    
})


module.exports = router;