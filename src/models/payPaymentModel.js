const mongoose = require('mongoose');

// Payment Schema
const paymentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true, // Assuming studentName is mandatory
    },
    feeTitle: {
      type: String,
      required: true, // Assuming feeTitle is mandatory
    },
    paymentAmount: {
      type: Number,
      required: true, // Payment amount should be a number
    },
    paymentMethod: {
      type: String,
      required: true, // Payment method (e.g., credit card, cash, etc.)
    },
    paymentDate: {
      type: String,
    },
    screenshot: {
      type: String,
      required: true, // URL from Cloudinary will be stored here
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to User model
      required: true, // Associate payment with a user (admin or student)
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

// Create the model from the schema
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
