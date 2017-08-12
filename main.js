var ejs = require('ejs'); //ejs is not express, but is a extension to express
var path = require("path"); //pathing system
var bodyParser = require('body-parser'); //parse POST data
var session = require('express-session'); //temporary to store sensitive data, see if theres better way
var express = require('express'); //express is good
var port = 5000;
// var http = require('http');
// var fs = require('fs');
var app = express();

// const http = require('http'); //http stuff, not needed yet
// const fs = require('fs'); //filesystem, not needed yet

app.engine('html', require('ejs').renderFile); //can use jsx also
app.use(session({
    secret: 'whatsecretshallweuse kitten',//session secret to sign sessions
    resave: true, //force save
    saveUninitialized: true,
    /*cookie: { secure: true }*/
})); //secure needs HTTPS, cookies will not be stored if running from HTTP with this option

app.use(bodyParser.json()); // supporting POST data
app.use(bodyParser.urlencoded({ extended: true })); // supporting POST data

/**
 * evals js/css/img folders for JS/CSS/image files
 */
app.use(express.static(path.join(__dirname, '/js')));
app.use(express.static(path.join(__dirname, '/css')));
app.use(express.static(path.join(__dirname, '/img')));

/**
 * listens to dynamic port if online, and local testing uses 5000
 */

// http.createServer (function(request, response){
//     var url = request.url;
//     switch(url){
//         case'/':
//         staticFile (response, 'njsac/index.html','text/html');
//         break;
//         case'/login':
//         staticFile (response, 'njsac/login.html','text/html');
//         break;
//         case'/dashboard':
//         staticFile (response, 'njsac/dashboard.html','text/html');
//         break;
//         default:
//         response.writeHead(404, {'Content-Type':'text/plain'});
//         response.end('404 - Page not Found');
//     }
// });

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

app.post('/login', function(req,res){
    if (!req.body) return res.sendStatus(400)
    console.log(req.body.username);
    console.log(req.body.password);
    console.log('Get username and password successfully!');
    var queryLogin = require('./nodemodjs/login');
    queryLogin.queryLogin(req.body.username,req.body.password);
    //var queryFunctions = require('./nodemodjs/loginTest');
    //queryFunctions.querydb(req.body.username,req.body.password)
});

// function staticFile (response,filepath, contentType){
//     fs.readFile(filepath,function(error,data){
//         if(error){
//             response.writeHead(500, {'Content-Type':'text/plain'});
//             response.end('500 - Internal Server Error.');
//         } if (data){
//             response.writeHead(200,{'Content-Type':'text/html'});
//             response.end(data);
//         }    
//     });
// }

console.log('server at localhost:5000');
