const express = require('express');
const router = express.Router();
const internController = require("./controllers/interncontroller")
const collegeController = require("./controllers/collegecontroller")

router.post("/college", collegeController.createCollegedata)  //create college detail

router.get("/college", collegeController.getcollegeData)  //get college detail

router.post("/interns", internController.createintern)  //create intern

module.exports = router