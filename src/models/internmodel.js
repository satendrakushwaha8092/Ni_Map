const mongoose = require("mongoose")

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'name is required'
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
    },
    mobile: {
        type: String,
        unique: true,
        required: true
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'college id is required',
        ref: "College"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
module.exports = mongoose.model("InternData", internSchema);