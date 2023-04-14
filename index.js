const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries')
const port = 5173
 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/categories', db.getCategories)
app.get('/mechanics', db.getMechanics)
 



 
 

