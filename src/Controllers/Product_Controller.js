const mongoose = require('mongoose');
const productModel = require('../Models/Product_Model');
const categoryModel = require('../Models/Category_Model');

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
}

const createProduct = async function (req, res) {
    try {
        const data = req.body;

        const { product_Name, category_Id, price, stock } = data;

        if (!isValid(product_Name)) {
            return res.status(400).send({ status: false, message: 'Product name is required' })
        }

        if (!isValid(category_Id)) {
            return res.status(400).send({ status: false, message: 'category_Id is required' })
        }

        if (!isValidObjectId(category_Id)) {
            return res.status(404).send({ status: false, message: "Invalid Id..!!" })
        }

        let category = await categoryModel.findById(category_Id)
        if (!category) {
            return res.status(404).send({ status: falase, massage: "Category does not exist..!!" });
        }

        if (!isValid(price)) {
            return res.status(400).send({ status: false, message: 'price is required' })
        }

        if (!isValid(stock)) {
            return res.status(400).send({ status: false, message: 'stock is required' })
        }

        const newProduct = await productModel.create(data)
        res.status(201).send({ status: true, message: "Success", data: newProduct })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const getProductById = async function (req, res) {

    try {
        const productId = req.params.productId;

        if (!isValidObjectId(productId)) {
            return res.status(404).send({ status: false, message: "Invalid Id..!!" })
        }

        const product = await productModel.findById({ _id: productId, is_Deleted: false });
        if (!product) return res.status(400).send({ status: false, message: "Product is deleted..!!" })

        return res.status(200).send({ status: true, message: "Success", data: product })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const updateProduct = async function (req, res) {

    try {
        let data = req.body
        const id = req.params.productId;

        if (!Object.keys(data).length > 0) returnres.send({ status: false, message: "Please enter data for updation..!!" })

        if (!isValidObjectId(id)) {
            return res.status(404).send({ status: false, message: "Invalid Id..!!" })
        }

        const productresent = await productModel.findById({ _id: id })

        if (!productresent) return res.status(404).send({ status: false, message: "Product not found..!!" })


        const update = await productModel.findOneAndUpdate({ _id: id, is_Deleted: false }, { $set: data }, { new: true })

        if (!update) return res.status(400).send({ status: false, message: "Product is Deleted..!!" })

        return res.status(200).send({ status: true, message: "Success", data: update })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const deleteProduct = async function (req, res) {
    try {
        const { productId } = req.params

        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).send({ status: false, message: "Product not found" })
        }

        const delProduct = await productModel.findByIdAndUpdate({ _id: productId, is_Deleted: false }, { is_Deleted: true }, { new: true })
        res.status(200).send({ status: true, message: "success", data: delProduct })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const productsList = async function (req, res) {
    try {
        let { page, limit } = req.query;
        if (!page) page = 1;
        if (!limit) limit = 10;
        const skip = (page - 1) * 10;
        const products = await productModel.find().skip(skip).limit(limit).populate('category_Id', 'categoryName');

        res.send({ page: page, limit: limit, productDetails: products })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

module.exports = { createProduct, getProductById, updateProduct, deleteProduct, productsList };