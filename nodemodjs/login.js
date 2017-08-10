var ejs = require('ejs'); //ejs is not express, but is a extension to express
var path = require('path'); //pathing system
var bodyParser = require('body-parser'); //parse POST data
const sql = require('mssql')
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
 
async () => {
    try {
        const pool = await sql.connect('mssql://accountant:Abcd1234@jedb.databse.windows.net/testDB')
        const result = await sql.query`select * from adminaccount where accountId = ${value}`
        console.dir(result)
    } catch (err) {
        // ... error checks 
    }
}