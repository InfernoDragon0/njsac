var ejs = require('ejs'); //ejs is not express, but is a extension to express
var path = require('path'); //pathing system
var bodyParser = require('body-parser'); //parse POST data
const express = require('express'); //express is good
const app = express();

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var config = {
    userName: 'accountant',
    password: 'Abcd1234',
    server: 'jedb.database.windows.net',
    options: { database: 'testDB', encrypt: true }
};

var selectusername = connection.query("select * from adminaccount where adminName='"+body.username+"'").toArray((error,results)=>{
if (error){
console.log('Error in the query');
}else{
    if (results.length < 1) {
                    console.log('No data found');
                    resolve('-1');
                    return;
                }
console.log('Successful query');
    for(let result of results){
        var accountId = result['accountId'],
        var adminId = result['adminId'],
        var adminName = result['adminName'],
        var adminPassword = result['adminPassword']
    };
};
});

app.post('/main'),function(req,res){
    if(req.body.username===adminName && req.body.password===adminPassword){
    }
        else{
    };
};

module.exports.checklogin=checklogin;
function checklogin(){

};