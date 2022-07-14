const mongoose = require('mongoose')

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}


const validation=function(req){
    if (!isValid(req.Name)) return "Name is required"
    if (!isValid(req.Designation)) return "Designation is required"
    if (!isValid(req.ContactNumber)) return "ContactNumber is required"
    if (!/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(req.ContactNumber)) return "please enter valid contact Number"
    if (!isValid(req.EmailID)) return "EmailID is required"
    if (!/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(req.EmailID)) return "please enter valid email id"
    if (!isValid(req.WebsiteURL)) return "WebsiteURL is required"
    if (!isValid(req.ThreesocialURLs)) return "ThreesocialURLs is required"
}

const objectvalidation=function(req){
    if (!isValidObjectId(req)) return "enter valid id"

}
module.exports.validation=validation
module.exports.objectvalidation=objectvalidation