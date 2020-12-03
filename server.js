const express = require('express');
const config = require('./config/app');
const bodyParser = require("body-parser");
const client = require('@mailchimp/mailchimp_marketing');
const { listId } = require('./config/app');
var cors = require('cors');
const md5 = require('md5');

//Calling Express
const app = express();

// Basic express app setup + MiddleWare

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());

app.use(cors());

const corsConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
};
// Setting up Console.log
app.listen(config.port, () => { 
 console.log(
    'Server started on port: ',
    config.port,
    
      )
});  
client.setConfig({
  apiKey: config.apiKey,
  server: config.server,
  listId: config.listId
 
});

// Testing out Calls
app.post( '/lists', async (req, res) => {
   corsConfig
  try {
    const {email, firstName, lastName} = req.body;
    const subscribingUser = req.body
    console.log(subscribingUser)
 
   const response = await client.lists.addListMember(listId, {
    email_address: subscribingUser.email,
    status: "subscribed",
    merge_fields: {
      FNAME: subscribingUser.firstName,
      LNAME: subscribingUser.lastName
    }
  }).then().catch((err) => console.log(err))
  
  return  res.redirect( 'http://localhost:3000/Success');
    }
   catch (err) {
    console.log(err.message );
    return res.status(500).send('Server error');

  }
}    );




