const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/todoRoute');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use('/', router);

const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

// app.get('/', (req, res) => {

//     res.send("Hello world");

// })

mongoose.connect(
    process.env.DB_CONNECTION,
    option,
    (err) => {
        console.log(err);
        
        if(err) {
            console.log("Error" + err);
            return;
        }
        console.log("database is connected");
        
        app.listen(3000, () => {
            console.log("application is running too");
        })
    })