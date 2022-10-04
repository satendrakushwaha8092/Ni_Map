const mongoose = require('mongoose')  //imporing mongoose

const userSchema=new mongoose.Schema({  //creating Schema
    title:{
        type: 'string',
        enum:["Mr","Mrs"]
    },
    name:{
        type: String,
        required: true
    },
    age:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    }
},{timestamps: true})

module.exports =mongoose.model("userData",userSchema)  //exporting module