const express = require('express');
const router = express.Router();
const pdfparse=require('./pdfparse')

router.post("/pdfparse", pdfparse.pdfparse)

module.exports = router;