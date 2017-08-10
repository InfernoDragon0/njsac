
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Create connection to database
var config = 
   {
     userName: 'accountant', // update me
     password: 'Abcd1234', // update me
     server: 'jedb.database.windows.net', // update me
     options: 
        {
           database: 'testDB' //update me
           , encrypt: true
        }
   }
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) 
   {
     if (err) 
       {
          console.log(err)
       }
    else
       {
           console.log('sucess');
            queryDatabase();
       }
   }
 );



 
function queryDatabase()
   { console.log('Reading rows from the Table...');

       // Read all rows from table
     request = new Request(
          "select * from jpay.adminaccount",
             function(err, rowCount, rows) 
                {
                    console.log(rowCount + ' row(s) returned');
                    process.exit();
                }
            );

     request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
         });
             });
     connection.execSql(request);
   }

   insert into jpay.adminaccount values (2,'1','test','test');

select * from jpay.adminaccount;

delete from adminaccount where accountId = '1';

update adminaccount set adminName = 'caleb' where accountId = '1';