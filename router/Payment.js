import express from 'express';
import paymentController from '../controller/Payment.js';

const router = express.Router();
const { create, getPaymentByID, getAllPayment } = new paymentController();

router.post('/create', create);
router.get('/getPayment/:id', getPaymentByID);
router.get('/getAllPayment', getAllPayment);

export default router;