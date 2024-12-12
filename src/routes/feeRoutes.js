const express = require('express');
const { 
  createFeeRecord, 
  getFeeRecords, 
  updateFeeRecord, 
  deleteFeeRecord 
} = require('../controllers/feeController');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware to attach userId (if required)
const router = express.Router();

// POST: Create a new fee record
router.post('/create', authMiddleware, createFeeRecord);

// GET: Get all fee records
router.get('/getFees', getFeeRecords);

// PUT: Update an existing fee record by feeId
router.put('/update/:feeId', authMiddleware, updateFeeRecord);

// DELETE: Delete a fee record by feeId
router.delete('/delete/:feeId', authMiddleware, deleteFeeRecord);

module.exports = router;
