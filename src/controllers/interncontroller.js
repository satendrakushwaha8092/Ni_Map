const InternModel= require("../models/internmodel")
const CollegeModel= require("../models/collegemodel")
const mongoose=require("mongoose");

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}
 
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const createIntern= async function (req, res) {   //In this block create Intership application
    try{
    let data= req.body
    
    if (Object.keys(data) == 0) return res.status(400).send({status: false,msg: "No input provided"})

    if(!isValid(data.name)) return res.status(400).send({status: false,msg: "name is required"})
    if(!isValid(data.email)) return res.status(400).send({status: false,msg: "email is required"})
    if (!/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.email)) return res.status(400).send({status: false,msg: "valid email is required"})

    if(await InternModel.findOne({email:data.email})) return res.status(400).send({status: false,msg: "email is already registered"})
    if(!isValid(data.mobile)) return res.status(400).send({status: false, msg:"mobile number is required"})
    if (!/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(data.mobile)) return res.status(400).send({status: false,msg: "valid phone number is required"})
    if(await InternModel.findOne({mobile:data.mobile})) return res.status(400).send({status: false,msg: "number is already registered"})

    if(!isValid(data.collegeId)) return res.status(400).send({status: false, msg:"college id is required"})
    if(!isValidObjectId(data.collegeId)) res.status(400).send({status: false, msg:"enter valid college id"})
    if(!await CollegeModel.findById(data.collegeId)) return res.status(400).send("collegeId is not found ")
    
    let savedData= await InternModel.create(data)
    res.status(201).send({msg: savedData})
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

module.exports.createintern= createIntern