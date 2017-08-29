function confirmSettlement(settlementId){ //for merchants

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
            requestUpdate = new Request(
                "update jpay.settlementrecords set confirmDate = '" + Date + "' where settlementId = '" + settlementId + "' ", function (err, rowCount, rows) {
                    if (err){
                        console.log('there is no record with that settlement id...\n')
                        process.exit();
                    }
                    console.log('settlement confirmed successfully...\n')
                }
            );

            connection.execSql(requestUpdate);
        }
    }
    );
};

// confirmSettlement('settlementId'); // update settlement to resolve

function confirmSettlement(merchantId){ //for merchants
    
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
                requestUpdate = new Request(
                    "update jpay.transactions set transactCheck = 'Y' where merchantId = '" + merchantId + "' and transactType = '4' ", function (err, rowCount, rows) {
                        if (err){
                            console.log('there is no record with that settlement id...\n')
                            process.exit();
                        }
                        console.log('settlement confirmed successfully...\n')
                    }
                );
    
                connection.execSql(requestUpdate);
            }
        }
        );
    };