const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.connect(
    process.env.DB_CONNECTION,
    option,
    (err) => {
        console.log(err)
        
        if(err) {
            console.log("Error" + err)
            return;
        }
        console.log("database is connected")
        
        app.listen(3000, () => {
            console.log("application is running too")
        })
    })