const express = require('express');
const config = require('./config/app');
const bodyParser = require("body-parser");
const client = require('@mailchimp/mailchimp_marketing');
const { apiKey, server, listId } = require('./config/app');

var cors = require('cors');
const request = require('request');
const md5 = require('md5');
//Calling Express
const app = express();

// Basic express app setup + MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

// Setting up Console.log
app.listen(config.port, () => { 
 console.log(
    'Server started on port: ',
    config.port,
    
      )
});  

app.post('/test', (req, res) => {

  res.status(400).json()
})

// Testing out Calls
app.post('/lists', async (req, res) => {
  client.setConfig({
    apiKey: config.apiKey,
    server: config.server,
    listId: config.listId
   
  });
  try {
    const {email, firstName, lastName} = req.body;
    console.log(req.body.email)

    const subscribingUser = req.body

 
   const response = await client.lists.addListMember(listId, {
    email_address: subscribingUser.email,
    status: "subscribed",
    merge_fields: {
      FNAME: subscribingUser.firstName,
      LNAME: subscribingUser.lastName
    }
  });
   res.json();
   res.status(200)

    }
   catch (err) {
    console.log(err.message )

  }
}    );




