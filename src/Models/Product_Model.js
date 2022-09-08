const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_Name: {
        type: String,
        trim: true
    },
    category_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    },
    id_Deleted: {
        type: Boolean,
        default: false
    }

},{timestamps:true});

module.exports = mongoose.model('Product', productSchema)