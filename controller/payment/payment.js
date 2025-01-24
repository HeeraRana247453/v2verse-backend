const express = require("express");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

// Payment Process
router.post("/process", catchAsyncErrors(async (req, res, next) => {
    var instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

    const options = {
        amount: req.body.amount,
        currency: "INR",
        receipt: `order_rcptid_${Date.now()}`,
        notes: {
            key1: "value3",
            key2: "value2"
        },
        payment_capture: 1,
    }

    try {
        const rzpCreatedOrder = await instance.orders.create(options);
        res.status(200).json({ success: true, rzpCreatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}));


// Verify payment signature (optional but recommended)
router.post("/verify", async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (hmac === razorpay_signature) {
            res.status(200).json({ success: true, message: "Payment verified" });
        } else {
            res.status(400).json({ success: false, message: "Invalid signature" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get payment
router.get("/:paymentId", async (req, res) => {
    const { razorpay_order_id } = req.params;

    const instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });
    try {
        const payment = await instance.payments.fetch(razorpay_order_id);
        if (!payment) {
            return res.status(500).json("Error at razorpay loading");
        }
        res.json({
            status: payment.status,
            method: payment.method,
            amount: payment.amount,
            currency: payment.currency,
        })
    }
    catch (error) {
        res.status(500).json("failed to fetch payment ")
    }
})


module.exports = router;