function retrieveCustomer() {

    const docdbClient = require("documentdb").DocumentClient;
    const client = new docdbClient('https://jetransact.documents.azure.com:443/', { masterKey: 'jXxaBwnQTqxkR1igcvDWPy02qjGfJJW3aceLte9FL89hllZSUKMpecFtRIPOEaFs0y6YWXbyT783KbpQf9teFA==' });

    const databaseUrl = `dbs/jElement`;
    const collectionUrlcustomerBTDetail = `${databaseUrl}/colls/customerBTDetail`;

    client.queryDocuments(collectionUrlcustomerBTDetail, "SELECT * FROM c").toArray((err, results) => {
        if (err) {
            console.log(JSON.stringify(err));
            console.log('\nconnection to cosmos failed...\n');
        }
        else {
            console.log('\nconnection to cosmos successful...\n');
            for (let result of results) {

                var customerId = result['customer_id'];
                var customerToken = result['customer_BTwalletToken'];
                var walletId = result['wallet_id'];
                var walletAmt = result['wallet_amt'];
                var pinNum = result['pin_6digit'];
                var customerStatus = '';

                insertIntoSQL(customerId, customerToken, walletId, walletAmt, pinNum, customerStatus);
                // console.log(customerId, customerToken, walletId, walletAmt, pinNum +'\n');
                setTimeout(function () { process.exit(); }, 1000);// need to set timeout else closes prematurely
            };
            console.log('transferring over customer details\n')
        };
    });
};

function insertIntoSQL(customerId1, customerToken1, walletId1, walletAmt1, pinNum1, customerStatus1) {

    var Connection = require('tedious').Connection;// module from package
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
            request1 = new Request(
                "insert into jpay.customerDetails (customerId, customerToken, walletId, walletAmt, pinNum, customerStatus) values (" + customerId1 + ", '" + customerToken1 + "', '" + walletId1 + "', '" + walletAmt1 + "', '" + pinNum1 + "', '" + customerStatus1 + "')", function (err, rowCount, rows) {
                    if (err) {
                        console.log('customer id : ' + customerId1 + ' already in sql database...\n')//cant violate primary key
                    } else {
                        console.log("transferring customer id = " + customerId1 + '\n');
                        console.log('1 customer inserted!\n');
                    }
                });
            connection.execSql(request1);
        }

    });
};

retrieveCustomer();