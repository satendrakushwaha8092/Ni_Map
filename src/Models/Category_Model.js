const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: { 
        type: String, 
        trim: true 
    },
    isDeleted: { 
        type: Boolean, 
        default: false 
    }

},{timestamps:true});

module.exports = mongoose.model('Category', categorySchema)