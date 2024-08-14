const express = require('express')
const router = express.Router()
const {createEvent, deleteEventById, getAllEvents} = require('./../controllers/event.controller')
const {users, events} = require('./../middlewares/validationBody')
const validateFields = require('./../middlewares/validationResult')


router.post('/create-event', events, validateFields, createEvent)
router.get('/get-all-events', validateFields, getAllEvents)
router.delete('/del-event/:id', validateFields, deleteEventById)

module.exports = router