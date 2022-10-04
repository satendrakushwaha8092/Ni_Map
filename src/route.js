const express = require('express');  //inmporting express
const router= express.Router()  //imports router
const controller = require('./controller')  //imports controller

router.post('/user',controller.createUser) //post method for create user
router.get('/user/:user',controller.getUser)  //get method to get user data

module.exports = router  //exporting router