const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');
var productController = require('./controllers/product-controller');


const SERVER_PORT = 3000;
var app = express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));

app.listen(SERVER_PORT,()=>console.log(`Server started at port: ${SERVER_PORT}`));

app.use('/products',productController);
