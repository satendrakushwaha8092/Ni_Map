const express=require('express')  //importing express framework
const bodyParser=require('body-parser')  //importing body parsor
const route=require('./route') //importing route file
const app=express() //calling express method
const mongoose=require('mongoose')  //importing mongoose
const multer = require("multer")  //importing multer for uploading file

app.use(bodyParser.json())  
app.use(bodyParser.urlencoded({extended:true}))
app.use(multer().any())  //uploading any files in multer

mongoose.connect("mongodb+srv://Satendrakushwaha:LR42b0N3nw0xCgNl@cluster0.pa1oj.mongodb.net/propeldb?authSource=admin&replicaSet=atlas-c5v59u-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true",{
        
        useNewUrlParser:true
})
    .then(()=>console.log("mongodb is connected"))
    .catch(err=>console.log(err))

    app.use('/',route) 

app.listen(process.env.PORT||3000,function(){
    console.log('Express is running on port'+(process.env.PORT||3000))
})