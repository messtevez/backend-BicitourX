import express from 'express';
import { createEvent, getAllEvents, deleteEventById, getEventById, updateEventById, addAttendeeToEvent } from '../controllers/event.controller';
import validateFields from '../middlewares/validationResult';

const router = express.Router();
router.post('/create-event', createEvent);
router.get('/get-all-events', validateFields, getAllEvents);
router.delete('/del-event/:id', validateFields, deleteEventById);
router.get('/get-event/:id', getEventById);
router.put('/update-event/:id', updateEventById);
router.put('/events/:id/reg', addAttendeeToEvent);
export default router;