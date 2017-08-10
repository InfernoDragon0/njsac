
var ejs = require('ejs'); //ejs is not express, but is a extension to express
var path = require('path'); //pathing system
var bodyParser = require('body-parser'); //parse POST data
var express = require('express'); //express is good
var app = express();
var http = require('http');

app.set('view engine', 'ejs');
app.use('/njsac', express.static('njsac')
);

app.get ('/', function(req,res){
    res.render('index');
});

app.get('/login', function(req,res){
    res.render('login');
});

// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/login', urlencodedParser, function(req,res){
    console.log(req.body.username);
    console.log(req.body.password);
    res.render('login');
});