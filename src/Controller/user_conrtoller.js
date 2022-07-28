const userModel=require('../Model/user_schema')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const signup=async (req,res)=>{
    const data=req.body
    const salt = await bcrypt.genSalt(10);

    data.password = await bcrypt.hash(data.password, salt);

    const savedData=await userModel.create(data)
    res.status(200).send({status:true,data:savedData})
}

const login = async function (req, res) {
    try {
        let user = req.body

        if (Object.keys(user) == 0) {
            return res.status(400).send({
                status: false,
                msg: "please provide data"
            })
        }


        let email = req.body.email
        let password = req.body.password


        if (!email) {
            return res.status(400).send({
                status: false,
                msg: "email is required"
            })
        }


        if (!password) {
            return res.status(400).send({
                status: false,
                msg: "password is required"
            })
        }


        let userEmailFind = await userModel.findOne({ email: email })
        if (!userEmailFind) {
            return res.status(400).send({
                status: false,
                msg: "email or password are not matching"
            })
        };


        bcrypt.compare(password, userEmailFind.password, function (err, result) {
            if (result) {
                let token = jwt.sign({
                    userId: userEmailFind._id,
                }, "geektrust");

                res.status(200).send({
                    status: true,
                    message: "user login successfully",
                    data: {
                        userId: userEmailFind._id,
                        token: token
                    }
                });
            } else {
                return res.status(401).send({
                    status: true,
                    message: "plz provide correct password"
                })
            }
        })


    } catch (error) {
        return res.status(500).send({
            status: false,
            msg: error.message
        })
    }

}

module.exports.signup=signup
module.exports.login=login