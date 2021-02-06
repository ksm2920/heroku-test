const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/todoRoute');
const nodeSass = require('node-sass-middleware');
require('dotenv').config();

const app = express();

app.use(nodeSass({
    src: __dirname + "/scss",                
    dest: __dirname + "/public",       
    debug: true,
    outputStyle: 'compressed'
}), express.static(__dirname + "/public"))

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use('/', router);

const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

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