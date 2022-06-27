const fs = require('fs');
const pdf = require('pdf-parse');

const pdfparse = async function (req, res) {
    let files = req.files
    if (files && files.length > 0) {
        let dataBuffer = fs.readFileSync(files[0].originalname);
        pdf(dataBuffer).then(function (data) {
            res.status(200).send({ status: true, data: data.text })

        });
    }else{
        res.status(400).send({ status:false, message:"please upload pdf"})
    }
}
module.exports.pdfparse = pdfparse