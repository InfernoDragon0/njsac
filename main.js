var ejs = require('ejs'); //ejs is not express, but is a extension to express
var path = require("path"); //pathing system
var bodyParser = require('body-parser'); //parse POST data
var session = require('express-session'); //temporary to store sensitive data, see if theres better way
var express = require('express'); //express is good
var port = 3000;
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

app.get('/merchant', function (req, res) { //base page
    res.render(path.join(__dirname + '/merchant.html'));
});

app.get('/transactions', function (req, res) { //base page
    res.render(path.join(__dirname + '/transactions.html'));
});

app.get('/createadmin', function (req, res) { //base page
    res.render(path.join(__dirname + '/createadmin.html'));
});

app.post('/createadmin', function(req, res){
    if (!req.body) {return res.sendStatus(400)
    }
    else{
        var mAdmin = require('./nodemodjs/createadmin');
        var createPromise = mAdmin.createAdmin(req.body.adminName, req.body.adminPass);
        createPromise.then(function(value){
        res.send("<script>alert('"+value+"')</script>");
        // --page continues to load
        });
    }
})

// app.post('/merchant'),function(req,res){
//     if(!req.body.merchantName){
//         res.writeHead(200, {'Content-Type':'text/html'});
//         res.write();
//         res.end();
//         }else{
//     if(!req.body.merchantHq){
    
//         }else{
//     if(!req.body.merchantLine){

//         }else{
//     if(!req.body.merchantEmail){
    
//         }else{

//     if(!req.body.merchantFax){

//     }

// }

app.get('/dashboard', function (req, res) { //base page
    // var mSearch = require('./nodemodjs/searchdb');
    // mSearch.queryDb(req.body.merchant);
    res.render(path.join(__dirname + '/dashboard.html'));
});

app.post('/login', function(req,res){
    if (!req.body) {return res.sendStatus(400)
    }else{
    console.log('Get username and password successfully!');

    var mLogin = require('./nodemodjs/login');
    // query database for login username and password
    var loginPromise = mLogin.queryLogin(req.body.username,req.body.password);

    loginPromise.then(function(value){
        if(value === 1){
            console.log('logging in now...');
            res.render(path.join(__dirname + '/dashboard.html'));
        }else{
            console.log('fail to login...');
            res.render(path.join(__dirname + '/login.html'));

            // --- put pop up alert if fail to login here ---
        }
    });
    }
    if (document.getElementById='link'){
        res.render(path.join(__dirname + '/createadmin.html'));
    }else{
        console.log(error)
    }
});

console.log('server at localhost:3000');

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
