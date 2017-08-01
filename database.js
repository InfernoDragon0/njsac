var createtable = require("./createtable");
var docMerchant = require("documentdb").DocumentMerchant;
var databasefunction ={};

//create connection
var merchant = new docMerchant(createtable.endpoint,{masterkey:createtable.primarykey});

//Error code
var HTTPStatusCode = {NOTFOUND:404}

//reference
var databaseURL = `dbs/${createtable.database.id}`;
var tableURL = `${databaseURL}/colls/${createtable.collection.id}`;

//create database if not existing
function createDb(){
    client.readDatabase(databaseURL, (err, result) => {
        if(err){
            client.createDatabase(createtable.database, (err, created) => {
                    if(err){
                        console.log(JSON.stringify(err));
                        
                    }
                    else{
                        console.log(JSON.stringify(created));
                    }
            });
        }
        else{
            console.log(JSON.stringify(result));
        }
    });
};

//create collection in database if not existing
function createTable(){
    client.readCollection(collectionURL, (err, result) => {
        if(err){
            client.createCollection(databaseURL, createtable.collection, null, (err, created) => {
                    if(err){
                        console.log(JSON.stringify(err));
                        
                    }
                    else{
                        console.log(JSON.stringify(created));
                    }
            });
        }
        else{
            console.log(JSON.stringify(result));
        }
    });
};

/*

// insert new client with new bttoken
function insertNewCustomerDataInput(data){
client.createDocument(collectionUrl, data, (err,created)=>{
    if(err){
     console.log(JSON.stringify(err));                 
    }
    else{
    console.log(JSON.stringify(created));
    }
    });
};
    function insertNewCustomer(newcustomer_id,newBTwalletToken){
    var new_id = newcustomer_id;
    // var newcustomer_id = '6';
    // var newBTwalletToken = 'token1';

    insertNewCustomerDataInput({'id': new_id,'customer_id': newcustomer_id,'customer_BTwalletToken':newBTwalletToken});
}
// how to use - inserNewClient("enter new customer_id here", "corresponding bt token")
insertNewCustomer('17','token 17');





 // find client token for existing client ID
function findBTtoken(customerID) {
    return new Promise((resolve, reject) =>{
        client.queryDocuments(collectionUrl,
        "Select * from root r where r.customer_id='"+customerID+"'").toArray((err, results)=>{
            if (err) {
                console.log(JSON.stringify(err));
            }
            else{
                for (let result of results) {
                    // console.log(JSON.stringify(result));
                //                     console.log("----------");
                // console.log(JSON.stringify(result));
                console.log("----------");
                var scustmoer_id = result["customer_id"];
                var scustomer_BTtoken= result["customer_BTwalletToken"]
               // console.log(result);
                console.log("----------");
                console.log("Searching Client ID: "+scustmoer_id);
                console.log("Coresponding BT Token: "+scustomer_BTtoken);
                resolve(result);
                
                }

              //resolve(results);
            }
        });
    });
};
// // findBTtoken(<customer_id>)
//findBTtoken(16);

*/

module.exports = databasefunction;
