/* ready to test*/
function insertRecord(merchant) {// update transaction status   

    var Connection = require('tedious').Connection;//mssql library module
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
    connection.on('connect', function (err) {
        if (err) {
            console.log(err)
        }
        else {
            console.log('\nConnection Successful!\n')
            requestAdd = new Request(
                "select transactAmt from jpay.transactions where transactType = '4' and transactCheck = 'N' and merchantId = '" + merchantId + "' ", function (err, rowCount, row) {
                     console.log('inserting settlement records...\n');
                }
            );

            requestAdd.on('row', function (columns) {
                var total = 0;
                columns.forEach(function (column) {
                    total = total + column.value;
                });
                insertSettlement(total, merchant);
                connection.execSql(requestAdd);
            });
        };
    });
};
    

    function insertSettlement(total, merchant) { 
        
        var Connection = require('tedious').Connection;//mssql library module
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
        connection.on('connect', function (err) {
            if (err) {
                console.log(err)
            }
            else {
                var row = searchRows();
                var nRow = row + 1;
                console.log(nRow);
                var date = new Date ();
                requestInsert = new Request(
                    "insert into jpay.settlementrecords values ("+ nRow +", '"+ date +"','','"+ merchant +"', '"+ total +"')", function (err, rowCount, row) {
                    }
                );
                    connection.execSql(requestInsert);
            };
        });
    };


    function searchRows(){
        var Connection = require('tedious').Connection;//mssql library module
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
        connection.on('connect', function (err) {
            if (err) {
                console.log(err)
            }
            else {

                requestSearch = new Request(
                    "select * from jpay.settlementrecords", function (err, rowCount, rows) {
                        return rowCount;
                    }
                );
                connection.execSql(requestSearch);
            }
        });
    };

    insertRecord('-1'); // add column and item to update transactionsid to settlement pending