const express=require('express')
const body_parser=require('body-parser')
const mongoose=require('mongoose')
const route=require('./routes')
const app=express()

app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}))

mongoose.connect('mongodb+srv://Satendrakushwaha:LR42b0N3nw0xCgNl@cluster0.pa1oj.mongodb.net/Ni_Map?authSource=admin&replicaSet=atlas-c5v59u-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',{
    useNewUrlParser:true
})
  .then(()=>console.log('mongodb is connected'))
  .catch((err)=>console.log(err))

app.use('/',route)

app.listen((process.env.port||3000),function(){
    console.log('express is running on port',(process.env.port||3000))
})