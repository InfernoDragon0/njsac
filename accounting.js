
var Connection = require("tedious").Connection;
var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;
var async = require("async");

// Create connection to database
var config = {
    userName: 'accountant',
    password: 'Abcd1234',
    server: 'jedb.database.windows.net',
    options: { 
        database: 'testDB', encrypt: true }
};

var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function (err) {
    if (err) {
        console.log(err);
        console.log("Error");
    }
        console.log("Connected!");
});


var query = "Select * from adminaccount";
function xSearch(connection,callback){
var results=[];//array
var request = new Request(query, function(error){
    if (error){
        return callback(error);
    }
    callback(null,results);
});
request.on("row",function(rowObject){
    results.push(rowObject);

});
connection.execSql(request);
}

function test(){
    xSearch(connection,function(error,results){
        consule.log(results);
    });
}

test();