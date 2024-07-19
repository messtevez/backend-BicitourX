const express = require('express')
const router = express.Router()
const {createUser} = require('./../controllers/user.controller')
const users = require('./../middlewares/validationBody')
const validateFields = require('./../middlewares/validationResult')


router.post('/registro',users, validateFields, createUser)



module.exports=router