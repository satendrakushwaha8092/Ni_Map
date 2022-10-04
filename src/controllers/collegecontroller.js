const CollegeModel = require("../models/collegemodel")
const InternModel = require("../models/internmodel")

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidData2 = function (value) {
    if (typeof (value) === "string" && (value).trim().length === 0) return false
    return true
}


const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const createCollegedata = async function (req, res) {  //In this block create college data
    try {
        let data = req.body

        if (Object.keys(data) == 0) return res.status(400).send({status: false,msg: "No input provided"})

        if(!isValid(data.name)) res.status(400).send({status: false, msg:"enetr college name"})
        if(await CollegeModel.findOne({name:data.name})) res.status(400).send({status:false,msg:"college is already registered"})

        if(!isValid(data.fullName)) res.status(400).send({status: false, msg:"enter fullname of college name"})
        if(await CollegeModel.findOne({name:data.fullName})) res.status(400).send({status:false,msg:"college is already registered"})

        if(!isValid(data.email)) res.status(400).send({status: false, msg:"enter email"})
        if (!/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.email)) return res.status(400).send({status: false,msg: "valid email is required"})

        if(await CollegeModel.findOne({name:data.email})) res.status(400).send({status:false,msg:"email is already registered"})

        let savedData = await CollegeModel.create(data)
        res.status(201).send({ msg: savedData })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const getcollegeData = async function (req, res) {   //In this block get college data with college intership candidate
    try {
        let filter = req.query
        if (Object.keys(filter).length == 0) return res.status(400).send({ status: false, msg: "filters are required" })//

        if (!await CollegeModel.findOne(filter)) return res.status(400).send({status:false,msg:"college not found"})

        let college = await CollegeModel.findOne(filter).select({ isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 })
        let data = JSON.parse(JSON.stringify(college))

        let internData = await InternModel.find({ collegeId: college._id }).select({ isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0, collegeId: 0 })
        if (Object.keys(internData).length == 0) return res.status(400).send({status:false,msg:"interndata not found for this college"})

        data.intersts = [...internData]
        res.status(200).send({ status: true, data: data })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}
module.exports.createCollegedata = createCollegedata
module.exports.getcollegeData = getcollegeData

/*{
  "data": {
    "name": "xyz",
    "fullName": "Some Institute of Engineering and Technology",
    "logoLink": "some public s3 link for a college logo",
    "interests": [
      {
        "_id": "123a47301a53ecaeea02be59",
        "name": "Jane Doe",
        "email": "jane.doe@miet.ac.in",
        "mobile": "8888888888"
      },
      {
        "_id": "45692c0e1a53ecaeea02b1ac",
        "name": "John Doe",
        "email": "john.doe@miet.ac.in",
        "mobile": "9999999999"
      },
      {
        "_id": "7898d0251a53ecaeea02a623",
        "name": "Sukruti",
        "email": "dummy.email@miet.ac.in",
        "mobile": "9191919191"
      },
      {
        "_id": "999803da1a53ecaeea02a07e",
        "name": "Neeraj Kumar",
        "email": "another.example@miet.ac.in",
        "mobile": "9898989898"
      }
    ]
  }
} */