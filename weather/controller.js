const axios = require("axios")

const getWeather = async function (req, res) {
    try {

        let city = req.query.q
        if(!city) return res.status(400).send({status:false,data:"please enter city using query params"})
        let appId = req.query.appid
        if(!appId) return res.status(400).send({status:false,data:"please enter appId using query params"})


        let option = {

            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}`

        }

        let result = await axios(option)
        res.status(200).send({ msg: result.data })


    } catch (err) { res.send({ Error: err.message }) }

}



const onlyTemp = async function (req, res) {
    try {
        console.log(req.method)
        let city = req.query.q
        if(!city) return res.status(400).send({status:false,data:"please enter city using query params"})
        let appId = req.query.appid
        if(!appId) return res.status(400).send({status:false,data:"please enter appId using query params"})

        let option = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}`

        }

        let result = await axios(option)
        const celsius = Math.round(result.data.main.temp - 273.15)
        const wind=result.data.wind
        res.status(200).send({ temp: `${celsius}°C`,wind:result.data.wind,time:new Date(result.data.dt*1000-(result.data.timezone*1000)),time2:new Date(result.data.dt*1000+(result.data.timezone*1000))})


    } catch (err) { res.send({ Error: err.message }) }

}

module.exports.getWeather = getWeather
module.exports.onlyTemp = onlyTemp
