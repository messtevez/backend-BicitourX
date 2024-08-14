const express = require('express')
const router = express.Router()
const {createUser, loginUser, updateUser, deleteUser, getUserByEmail} = require('./../controllers/user.controller')
const {users, events} = require('./../middlewares/validationBody')
const validateFields = require('./../middlewares/validationResult')


router.post('/registro', users, validateFields, createUser)
router.post('/login', validateFields, loginUser)
router.put('/update-user', validateFields, updateUser)
router.delete('/delete-user/', deleteUser)
router.get('/get-user-email', validateFields, getUserByEmail)


module.exports=router