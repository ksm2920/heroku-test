const Todo = require('../model/todo');
const User = require('../model/user');


const todoRender = async(req, res) => {
    const user = await User.findOne({_id:req.user.user._id});

    const sorted = +req.query.sorted || -1;
    const page = +req.query.page || 1;
    const editId = req.query.editId || -1;
    
    const totalItems = await User.findOne({_id:req.user.user._id}).populate("todoList").countDocuments();
    
    const itemsToShowPerPage = 2;
    
    const maxPageNr = Math.ceil(totalItems/itemsToShowPerPage);
    
    const itemsToShow = itemsToShowPerPage * page;
    
    const userWithTodoList = await User.findOne({_id:req.user.user._id}).populate("todoList")

    const items = userWithTodoList.todoList;

    //.limit(itemsToShow).sort({date: sorted});

    
    res.render('index.ejs', {
        user,
        editId, 
        items, 
        page,
        maxPageNr, 
        sorted,
        success: req.query.success, 
        error:req.query.error})
    ;  

}

const todoSubmit = async (req, res) => {
    const page = +req.query.page || 1;

    const itemsToShowPerPage = 2;
    const itemsToShow = itemsToShowPerPage * page;
    
    if(req.body.task) {
        const todo = await new Todo({
            task: req.body.task 
        }).save();

        const user = await User.findOne({_id:req.user.user._id});

        user.addTodoList(todo._id);
        
        await Todo.find().limit(itemsToShow);
        
        res.redirect("/?success=A task was added successfully!");
    } else {
        res.redirect("/?error=Please add a task!");
    }
    
}

const todoEdit = async (req,res) => {
    const id = req.params.id;
    const page = +req.query.page || 1;
    
    await Todo.findByIdAndUpdate(id, {task: req.body.task}, () => {  
        Todo.find().countDocuments();
        res.redirect("/?page=" + page + "&sorted=" + req.query.sorted);
    })     
    
}

const todoRemove = async (req, res) => {
    const id = req.params.id;
    
    await Todo.findByIdAndRemove(id, {task: req.body.task}, () => {  
        res.redirect("/?page=" + req.query.page + "&sorted=" + req.query.sorted);
    })
    
}

module.exports = {
    todoRender,
    todoSubmit,
    todoEdit,
    todoRemove
}