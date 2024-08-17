const express = require('express')
const router = express.Router()
const {createEvent, deleteEventById, getAllEvents, getEventById, updateEventById, capacityValidator} = require('./../controllers/event.controller')
const {events} = require('./../middlewares/validationBody')
const validateFields = require('./../middlewares/validationResult')


router.post('/create-event', events, validateFields, createEvent)
router.get('/get-all-events', validateFields, getAllEvents)
router.delete('/del-event/:id', validateFields, deleteEventById)
router.post('/reg-event', events, validateFields, createEvent)
router.get('/get-event/:id', getEventById)
router.put( '/update-event/:id', updateEventById)
router.put('/events/:id/reg', capacityValidator)


module.exports = router