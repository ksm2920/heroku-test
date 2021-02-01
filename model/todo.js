const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({

    task: { 
        type: String, 
        require: true
    },
    date: { 
        type: Date, 
        default: Date.now
    }

});

module.exports = mongoose.model("todo", todoSchema);