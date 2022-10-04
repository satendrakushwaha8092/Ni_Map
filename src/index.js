const express = require('express')
const app = express()
const route=require('./route')  //import route file
const bodyParser = require('body-parser')  //importing body-parser for json input
const mongoose = require('mongoose')  //importing mongoose for connect database

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))

//connecting string method or clustoer
mongoose.connect("mongodb+srv://Satendrakushwaha:LR42b0N3nw0xCgNl@cluster0.pa1oj.mongodb.net/project_3?authSource=admin&replicaSet=atlas-c5v59u-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",{
    useNewUrlParser:true
})
 .then(()=>console.log("mongodb is connected"))
 .catch(err=>console.log(err));

app.use('/',route)

app.listen((process.env.PORT||3000),function(){
    console.log("express is running on port",+(process.env.PORT||3000))
})