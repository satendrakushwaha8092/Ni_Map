const mongoose = require('mongoose')  //importing mongoose pakage
const schema = new mongoose.Schema({  //creating schema
    Name: {
        type:String,
        required:true
    },
    Designation: {
        type:String,
        required:true
    },
    ContactNumber: {
        type:Number,
        required:true
    },
    EmailID: {
        type:String,
        required:true
    },
    WebsiteURL: {
        type:String,
        required:true
    },
    ThreesocialURLs: {
        type:Array,
        required:true
    },
    CompanyLogo:{
            type:String,
            required:true
    }
}, { timestamps: true })

module.exports=mongoose.model("user",schema)  //exporting schema
