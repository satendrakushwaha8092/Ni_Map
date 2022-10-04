const mongoose = require("mongoose")
const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        require:'college name is required',
        unique: true
    },
    fullName: {
        type: String,
        require: 'college full name is required',
        unique: true
    },
    email: {
        type: String,
        require: 'college full name is required',
        unique: true
    },
    // placementDetail:[
    //     {
    //         companyName:{
    //             name:String,
    //             required:true
    //         },
    //     }
    // ],
    // logoLink: {
    //     type: String,
    //     require:'logolink is required',
    //     unique: true
    // },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
module.exports = mongoose.model("CollegeData", collegeSchema);