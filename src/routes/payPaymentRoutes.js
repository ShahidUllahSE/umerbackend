const express = require('express');
const { createPaymentRecord } = require('../controllers/payPaymentController');
const authMiddleware = require('../middlewares/authMiddleware'); // Assuming you want auth for this route
const upload = require('../utils/cloudinary'); // Use the cloudinary upload middleware

const router = express.Router();

// POST: Create a new payment record
router.post('/create', authMiddleware, upload.single('screenshot'), createPaymentRecord);

module.exports = router;
