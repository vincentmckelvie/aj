require('dotenv').config();
const express = require("express");
const app = express();
const compression = require("compression");

app.use(compression());

app.use(express.static(__dirname+'/src'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/index.html');
});

app.listen(process.env.PORT||3010, ()=>{console.log("listening on 3010")});