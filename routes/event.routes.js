const express = require('express')
const router = express.Router()
const {createEvent, deleteEventById, getAllEvents, getEventById, updateEventById} = require('./../controllers/event.controller')
const {events} = require('./../middlewares/validationBody')
const validateFields = require('./../middlewares/validationResult')


router.post('/reg-event', events, validateFields, createEvent)
router.get('/get-all', getAllEvents)
router.get('/get-event/:id', getEventById)
router.put( '/update-event/:id', updateEventById)
router.delete('/del-event/:id', deleteEventById)

module.exports = router