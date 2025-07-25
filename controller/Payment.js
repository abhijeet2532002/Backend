import express from 'express';
import paymentModel from '../model/Payment.js';

export default class Payment {
    async create(req, res) {
        try {
            const paymentData = await paymentModel.create(req.body);
            res.status(200).json({
                message: `Payment created successfully`,
                paymentData
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }


    async getPaymentByID(req, res) {
        try {
            const paymentDetails = await paymentModel.findById(req.params.id);
            if (!paymentDetails) {
                res.status(404).json({
                    message: `Payment not find by this payment ID`,
                    paymentDetails
                })
            }

            res.status(200).json({
                message: `Successfully fetch the paymentDetails`,
                paymentDetails
            })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }


    async getAllPayment(req, res) {
        try {
            const paymentDetails = await paymentModel.find({});
            res.status(200).json({
                message: `Successfully Fetch All Payment Details`,
                paymentDetails
            })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }

}