var ejs = require('ejs'); //ejs is not express, but is a extension to express
var path = require("path"); //pathing system
var bodyParser = require('body-parser'); //parse POST data
var session = require('express-session'); //temporary to store sensitive data, see if theres better way
var loginFunctions= require('./nodemodjs/login');

const express = require('express'); //express is good
const app = express();
//const http = require('http'); //http stuff, not needed yet
//const fs = require('fs'); //filesystem, not needed yet
const port = 5000;

app.engine('html', require('ejs').renderFile); //can use jsx also
app.use(session({
    secret: 'whatsecretshallweuse kitten',//session secret to sign sessions
    resave: true, //force save
    saveUninitialized: true,
    /*cookie: { secure: true }*/
})); //secure needs HTTPS, cookies will not be stored if running from HTTP with this option
app.use(bodyParser.json()); // supporting POST data
app.use(bodyParser.urlencoded({ extended: true })); // supportting POST data
/**
 * evals js/css/img folders for JS/CSS/image files
 */
app.use(express.static(path.join(__dirname, '/js')));
app.use(express.static(path.join(__dirname, '/css')));
app.use(express.static(path.join(__dirname, '/img')));

/**
 * listens to dynamic port if online, and local testing uses 5000
 */
app.listen(process.env.PORT || port);

app.get('/', function (req, res) { //base page
    res.render(path.join(__dirname + '/index.html'));
});

app.get('/login', function (req, res) { //base page
    res.render(path.join(__dirname + '/login.html'));
});

app.get('/dashboard', function (req, res) { //base page
    res.render(path.join(__dirname + '/dashboard.html'));
});
