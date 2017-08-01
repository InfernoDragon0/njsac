var express = require('express');
var mysql = require('mysql');
var app = express();


var connection = mysql.createConnection ({
    host:'http://www.jeaccounting.database.windows.net',
    user:'jeadmin',
    password:'JEpassword123',
    database:'jeaccounting'
});

connection.connect(function(error){
    if(!!error){
        console.log('Error');
    }else{
        console.log('Connected');
    }
});

app.get('/',function(req,resp){
    //query sql
    connection.query("SELECT *", function(error,rows,fields){
        if (!!error){
            console.log('Error in the query');
        }else{
            console.log('Successful query');
        }
});

})

app.listen(1337);



