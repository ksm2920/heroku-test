const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    token: String,
    tokenExpiration: Date,
    todoList: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "todo"
        }
    ]

})

userSchema.methods.addTodoList = function(todoId) {
    this.todoList.push(todoId);
    this.save();
}

const User = mongoose.model("user", userSchema);

module.exports = User;