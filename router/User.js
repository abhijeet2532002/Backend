import express from 'express';
import UserController from '../controller/User.js';

const router = express.Router();
const {login,register,findByEmail,getAllUser,verifyToken} = new UserController();

router.post('/login',login);
router.post('/register',register);
router.get('/fetch/:email',verifyToken,findByEmail)

export default router;