const Payment = require('../models/payPaymentModel');
const User = require('../models/userModel');  // Assuming you have a User model
const upload = require('../utils/cloudinary');  // Import the multer setup

const createPaymentRecord = async (req, res) => {
    try {
      const { studentName, feeTitle, paymentAmount, paymentMethod, paymentDate } = req.body;
  
      // File upload will happen through Multer and Cloudinary middleware
      const screenshot = req.file?.path; // The Cloudinary URL will be stored in req.file.path after upload
  
      if (!screenshot) {
        return res.status(400).json({ message: 'Screenshot is required' });
      }
  
      const userId = req.userId;  // Get userId from auth middleware
  
      // Create a new payment record with the provided data
      const newPayment = new Payment({
        studentName,
        feeTitle,
        paymentAmount,
        paymentMethod,
        paymentDate,
        screenshot,  // Save the Cloudinary URL here
        user: userId,  // Attach the authenticated user's ID
      });
  
      // Save the payment record
      await newPayment.save();
  
      res.status(201).json({ message: 'Payment record created successfully', newPayment });
    } catch (error) {
      console.error('Error creating payment record:', error);
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = { createPaymentRecord };
