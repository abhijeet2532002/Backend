import paymentModel from '../model/Payment.js';
import AccountMailer from '../config/sendMail.js'

export default class Payment {
    async create(req, res) {
        try {
            const paymentData = await paymentModel.create(req.body);
            AccountMailer.sendMail(req.body);
            const io = req.app.get("io");
            io.emit("newPayment", {
                message: "New payment received!",
                data: req.body
            });

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
        const page = parseInt(req.query.page) || 1;      // Default to page 1
        const limit = parseInt(req.query.limit) || 10;   // Default limit = 10
        const skip = (page - 1) * limit;

        const [paymentDetails, total] = await Promise.all([
            paymentModel.find({})
                .sort({ createdAt: -1 }) // Optional: latest first
                .skip(skip)
                .limit(limit),
            paymentModel.countDocuments()
        ]);

        res.status(200).json({
            message: "Successfully fetched payment details",
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            paymentDetails
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


}