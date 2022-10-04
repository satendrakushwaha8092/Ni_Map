const userModel=require('./model')  //importing usermode;
const mongoose=require('mongoose')  //importing mongoose for object validationSchema

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId) //check object validation
}

const createUser=(req,res)=>{  //method for create user
    //promise produce
    const createUser=new Promise((resolve,reject)=>{
        const data=req.body

        if(!Object.keys(data).length) return reject({ status:false,message:"enter name,age and gender"})  //if request body is empty
        if(!isValid(data.title)) return reject({ status:false,message:"enter title"})
        if(!isValid(data.name)) return reject({ status:false,message:"enter name"})  //if user not give name
        if(!isValid(data.age)) return reject({ status:false,message:"enter age"})
        if(!isValid(data.email)) return reject({status:false,message:"email is required"}) //if user not give email
        const duplicateEmail=new Promise((resolve,reject)=>{
            if(userModel.findOne({email:data.email})) reject({status:false,msg:"email is used"})
        })

        .catch(err=>res.status(400).send({ status:false,data:err}))

        const savedUser=userModel.create(data)
        resolve(savedUser)
    })
    //promise consume
    createUser.then(user=>res.status(200).send({ status:true,data:user}))
    .catch(err => res.status(400).send({ status:false,data:err}))
}


const getUser=(req,res)=>{  //get user by object id using body params
        const userId=req.params.user  //storing userId of body params

        //validation for userId
        if (!isValidObjectId(userId)) { //checking userId validation
            return res.status(400).send({
                status: false,
                msg: "userId is not valid"
            })
        }

        const check=new Promise((resolve,reject)=>{  //promise method
            const res=resolve(userModel.findById(userId))
            reject("not found") 
        })

        check.then((user)=>{
            //if user is not present
            if(!user) res.status(400).send({ status:false,message:"user not available"})
            res.status(200).send({ status:true,data:user})
        })
        .catch(err => {
            res.status(500).send({ status:false,data:err.message})
        })
}

module.exports.createUser = createUser  //exporting createUser method
module.exports.getUser=getUser  //exporting getUser method