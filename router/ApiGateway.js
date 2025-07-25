import express from 'express';
import user from './User.js';
import payment from './Payment.js';

const router = express.Router();

router.use('/user',user);
router.use('/payment',payment);

export default router;