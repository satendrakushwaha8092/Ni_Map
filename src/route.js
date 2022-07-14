const express=require('express')
const router=express.Router()  //calling router method
const controller=require('./controller')  //importing  controller

router.post('/business-card',controller.createBusinessCard)  //creating apis and calling related method

router.get('/business-card/:id',controller.getbusinesscard)

module.exports=router  //exporting router