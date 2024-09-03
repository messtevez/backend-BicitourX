import express from 'express';
import { createUser, loginUser, updateUser, deleteUser, getUserByEmail } from '../controllers/user.controller';
import { users, login } from '../middlewares/validationBody';
import validateFields from '../middlewares/validationResult';

const router = express.Router();
router.post('/registro', users, validateFields, createUser);
router.post('/login', login, validateFields, loginUser);
router.put('/update-user', validateFields, updateUser);
router.delete('/delete-user', deleteUser);
router.get('/get-user-email/:email', validateFields, getUserByEmail);
export default router;