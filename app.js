// Require the express module
const express = require('express');
// Require the jsonflex module
const flexjson = require('jsonflex')();
// Create a new web server
const app = express();
// Tell the web server to serve files
// from the www folder
app.use(express.static('www'));
// Use jsonflex
app.use(flexjson);
// Start the web server on port 3000
app.listen(3000,() => console.log('Listening on port 3000'));


// Create the folder json/users and json/usernames if they don't exist'
const fs = require('fs');
if(!fs.existsSync('./www/json')){ fs.mkdirSync('./www/json')}
if(!fs.existsSync('./www/json/usernames')){ fs.mkdirSync('./www/json/usernames')}
if(!fs.existsSync('./www/json/users')){ fs.mkdirSync('./www/json/users')}
