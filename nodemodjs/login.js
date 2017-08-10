
var ejs = require('ejs'); //ejs is not express, but is a extension to express
var path = require('path'); //pathing system
var bodyParser = require('body-parser'); //parse POST data
const express = require('express'); //express is good
const app = express();
var http = require('http');

// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/login', urlencodedParser, function(req,res){
    if (!req.body) return res.sendStatus(400)
    var name = req.body.username;
    var pW = req.body.password;
    console.log(name);
    console.log(pW);
    res.render('login');
});