const express = require('express');
const Todo = require('../model/todo');

let router = express.Router();

router.get('/', async(req, res) => {
    
    const sorted = +req.query.sorted || -1;
    const page = +req.query.page || 1;
    const editId = req.query.editId || -1;
    
    const totalItems = await Todo.find().countDocuments();
    
    const itemsToShowPerPage = 2;
    
    const maxPageNr = Math.ceil(totalItems/itemsToShowPerPage);
    
    const itemsToShow = itemsToShowPerPage * page;
    
    const items = await Todo.find().limit(itemsToShow).sort({date: sorted});
    
    res.render('index.ejs', {
        editId, 
        items, 
        page,
        maxPageNr, 
        sorted,
        success: req.query.success, 
        error:req.query.error})
    ;  

})

router.post('/', async (req, res) => {
    const page = +req.query.page || 1;

    const itemsToShowPerPage = 2;
    const itemsToShow = itemsToShowPerPage * page;
    
    if(req.body.task) {
        await new Todo({
            task: req.body.task 
        }).save();
        
        await Todo.find().limit(itemsToShow);
        
        res.redirect("/?success=A task was added successfully!");
    } else {
        res.redirect("/?error=Please add a task!");
    }
    
})

router.post("/edit/:id", async (req,res) => {
    const id = req.params.id;
    const page = +req.query.page || 1;
    
    await Todo.findByIdAndUpdate(id, {task: req.body.task}, () => {  
        Todo.find().countDocuments();
        res.redirect("/?page=" + page + "&sorted=" + req.query.sorted);
    })     
    
})

router.get("/remove/:id", async (req, res) => {
    const id = req.params.id;
    
    await Todo.findByIdAndRemove(id, {task: req.body.task}, () => {  
        res.redirect("/?page=" + req.query.page + "&sorted=" + req.query.sorted);
    })
    
})

module.exports = router;