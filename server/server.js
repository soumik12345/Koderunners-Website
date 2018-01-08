const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');
const http = require('http');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Middleware for server request logs
app.use(function(req, res, next) {
    var now=new Date().toString();
    var log=`${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log+'\n', function(err) {
        if(err)
            console.log('Unable to write the log to log file');
    });
    next();
});

// Middleware for maintainance
// app.use(function(req, res, next) {
//     res.render('maintainance.hbs');
// });

const publicPath = path.join(__dirname, '../');

// Function to get the current year
hbs.registerHelper('getCurrentYear', function() {
    return new Date.getFullYear();
});

hbs.registerHelper('ToUpperCase', function(text) {
    return text.toUpperCase();
});

app.use('/', express.static(publicPath));

app.get('/', function(req, res) {
    res.render('index.hbs', {
        pageTitle: 'Koderunners | Home Page',
        welcomeMessage: 'the Guide To Coding Starts Here'
    });
});

app.get('/about', function(req, res) {
    res.render('about.hbs', {
        pageTitle: 'Koderunners | About'
    });
});

app.listen(port, function() {
    console.log('Server is up and running on port', port);
});