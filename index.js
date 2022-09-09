var express = require('express');
var app = express();
var qs = require('qs');
const date = require('date-and-time')
app.get('/', function (req, res) {
    const mongo = require("mongodb").MongoClient;
    mongo.connect("mongodb+srv://admin:admin@clusternewversion.69qfa.mongodb.net/?retryWrites=true&w=majority").then(client => 
    {
        console.log("Connected to MongoDB server");
        const axios=require("axios");
        // Select a MongoDB database to watch
        const db = client.db("Company"); 
        pipeline = [];
        const changeStream = db.watch(pipeline,{ showExpandedEvents: true });
    
        console.log(`\n ******* Listening to the changes in MongoDB ********`);
    
        // start listenening to changes
        changeStream.on("change", function(event)
        {
            console.log(JSON.stringify(event));
            var jsonParsed = JSON.parse(JSON.stringify(event));
    
            // get the change event paramaters and store in a variable 
            var OperationType=jsonParsed.operationType;
            var Database=jsonParsed.ns.db;
            var Collection=jsonParsed.ns.coll;
    
            console.log('\nOperationType:',jsonParsed.operationType);
            console.log('Database:',jsonParsed.ns.db);
            console.log('Collection:',jsonParsed.ns.coll);
            
            var accessToken=null;
            
            const body=qs.stringify(
                {
                'grant_type': 'client_credentials',
                'client_id': '65f32d58-5842-4dfe-a0de-f32682fa0e95',
                'client_secret': 'L2H8Q~2IRn-hsjM4K9XPcqPMMXA-ICnnK3un0dbW',
                'resource': 'https://purview.azure.net'
            });
            const headers = { 
                'Content-Type': 'application/x-www-form-urlencoded'
            };
    
            console.log(`\n ******* POST call and get the bearer token ********`);
            // Post Call to get the bearer token
            axios.post('https://login.microsoftonline.com/c96563a8-841b-4ef9-af16-33548de0c958/oauth2/token',body,{ headers })
            .then(res => {
                //console.log(`status code:${res.status}`);
                //console.log(`Body:${JSON.stringify(res.data)}`);
                accessToken=res.data.access_token;
                //console.log(`Access Token:${accessToken}`);
                makecall (accessToken);
            })
            .catch(function (error) {
                if (error.response) {
                console.log('data',error.response.data);
                console.log('status',error.response.status);
                console.log('headers',error.response.headers);}
                });
            
            function makecall(var1)
            {
                var newAccessToken=`Bearer ${var1}`;
                //Check if the operationType is Create or Delete
                if(OperationType=='create')
                {
                    console.log(`\n ******** MongoDB collection will be created in the Azure Purview Portal! ******** \n `);
                    var body = JSON.stringify({
                        "entities": [
                            {
                            "typeName": "mongodb_collection",
                            "attributes": {
                                "modifiedTime": 0,
                                "createTime": 0,
                                "qualifiedName": `mongodb://atlas-mkkvsy-shard-0/databases/${Database}/collections/${Collection}`,
                                "name": `${Collection}`
                            }
                            }
                        ]
                        });
                    const headers = { 
                            'Authorization': newAccessToken, 
                            'Content-Type': 'application/json'
                    };
            
                    // call a POST API call to create the mongodb collection in Purview
                    axios.post('https://mdbPurview.catalog.purview.azure.com/api/atlas/v2/entity/bulk?guid=df972dde-0a17-42b5-b397-d13afa93a6ac&ignoreRelationships=false',body,{ headers })
                    .then(res => {
                        console.log(`status code:${res.status}`);
                        console.log(`Body:${JSON.stringify(res.data)}`);
                        console.log(`\n ******** Success! Let's Vaidate in the Azure Purview Portal now! ********`);
                    }) .catch(function (error) {
                        if (error.response) {
                        console.log('data',error.response.data);
                        console.log('status',error.response.status);
                        console.log('headers',error.response.headers);}
                        });
                }
                if(OperationType=='drop') 
                {
                    console.log(`\n ******** MongoDB Collection will be dropped soon from the Azure Purview Portal!  ******** \n `);
                    const headers = { 
                        'Authorization': newAccessToken
                        };
                    var qualifiedName=`mongodb://atlas-mkkvsy-shard-0/databases/${Database}/collections/${Collection}`;
    
                    // call a DEL API call to drop the mongodb collection in Purview
                    axios.delete(`https://mdbPurview.catalog.purview.azure.com/api/atlas/v2/entity/uniqueAttribute/type/mongodb_collection?attr:qualifiedName=${qualifiedName}`,{ headers })
                    .then(res => {
                        console.log(`status code:${res.status}`);
                        console.log(`Body:${JSON.stringify(res.data)}`);
                        console.log(`\n ******** Success! Let's Vaidate in the Azure Purview Portal now! ********`);
                    }) .catch(function (error) {
                        if (error.response) {
                        console.log('data',error.response.data);
                        console.log('status',error.response.status);
                        console.log('headers',error.response.headers);}
                        });       
                }       
            }           
        }); 
     });
  const now  =  new Date();
  const value = date.format(now,'YYYY/MM/DD HH:mm:ss');
  res.send('MongoDB ChangeStream for Purview '+ value.toString());
});
app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

