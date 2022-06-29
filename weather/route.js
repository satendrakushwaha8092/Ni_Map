const express = require('express');
const router = express.Router();
const weatherMap = require("./controller")

router.get("/weather/london", weatherMap.getWeather)
router.get("/weather", weatherMap.onlyTemp)

module.exports = router;