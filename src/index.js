const mysql= require("mysql")
const dotenv = require('dotenv');
require('dotenv').config();
const express = require("express")
const route = require("./routes/route")
const app = express()
//const multer=require("multer")
app.use(express.json())
//app.use(express.urlencoded((extended:true)))
//const { AppConfig } = require('aws-sdk');
//app.use( multer().any())
require('./models/mainModels')
app.use('/',route)
let port = 3306
app.listen(port,()=>{
    console.log("server is connected on : " + port)
})