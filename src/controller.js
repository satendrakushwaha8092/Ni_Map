const model = require('./model')  //importing model
const aws = require('./aws') //importing aws for save company logo
const validation = require('./validation') //checking validation if user not gives required data

const createBusinessCard = async function (req, res) {
    try {
        let dt = req.body //store req.body in dt

        if (Object.keys(dt) == 0) //checking if req body is empty
        return res.status(400).send({
            status: false,
            msg: "please provide Name,Designation,ContactNumber,EmailID,WebsiteURL,ThreesocialURLs and upload Company logo"
        })

        let data = JSON.parse(dt.abcd)
        let files = req.files

        if (await model.findOne({ ContactNumber: data.ContactNumber })) //checking duplicate contact number
            return res.status(400).send({
                status: false,
                msg: "ContactNumber is already exist"
            })

        if (await model.findOne({ EmailID: data.EmailID })) //checking duplicate email
            return res.status(400).send({
                status: false,
                msg: "EmailID is already exist"
            })

        if (validation.validation(data)) //checking if Name,Designation,ContactNumber,EmailID,WebsiteURL,ThreesocialURLs and upload Company logo one of them is missing in validation file
            return res.status(400).send({
                status: false,
                msg: validation.validation(data)
            })

        if (files && files.length > 0) { //upload company logo to s3 and saved link in company logo
            //upload to s3 and get the uploaded link
            // res.send the link back to frontend/postman
            let uploadedFileURL = await aws.uploadFile(files[0])
            data.CompanyLogo = uploadedFileURL;
        } else {
            return res.status(400).send({
                status: false,
                msg: "Company Logo is required"
            })
        }

        const savedData = await model.create(data) //created data in database and save response in saved data
        res.status(200).send({
            status: true, data:
                savedData
        })
    } catch (err) {
        res.status(500).send({
            status: false,
            data: err.message
        })

    }
}

const getbusinesscard = async function (req, res) {

    const id = req.params.id //storing path params in id

    if (validation.objectvalidation(id)) //checking validation for id
        return res.status(400).send({
            status: false,
            msg: validation.objectvalidation(id) 
        })

    if (!await model.findOne({ _id: id })) //finding data in database for given id if not present
        return res.status(200).send({
            status: false,
            msg: "Not present"
        })
    const findcard = await model.findOne({ _id: id }) //finding data in database for given id
    return res.status(200).send({
        status: false,
        msg: findcard
    })
}

module.exports.createBusinessCard = createBusinessCard  //exporting methods create card
module.exports.getbusinesscard = getbusinesscard  //exporting method for get business card