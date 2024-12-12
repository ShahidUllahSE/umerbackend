const Fee = require('../models/feeModel');

// Create a new fee record
const createFeeRecord = async (req, res) => {
  try {
    const { feeAmount, studentClass, status, registrationNumber, studentName } = req.body;

    // Directly create a new fee record with the provided data, no validation required
    const newFee = new Fee({
      studentName: studentName || "Unknown",  // If no student name is provided, default to "Unknown"
      registrationNumber,
      feeAmount,
      class: studentClass || "Not Assigned", // Default to "Not Assigned" if no class is provided
      status,
      createdBy: req.userId,  // Assuming userId is attached by authMiddleware
    });

    await newFee.save();

    res.status(201).json({ message: 'Fee record created successfully', newFee });
  } catch (error) {
    console.error('Error creating fee record:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all fee records
const getFeeRecords = async (req, res) => {
  try {
    const feeRecords = await Fee.find()
      .populate('createdBy', 'name') // Populate the createdBy field (if needed) to show the user's name who created the record
      .populate('studentName', 'studentName') // Populate the studentName field (if needed)
      .exec();

    res.status(200).json({ feeRecords });
  } catch (error) {
    console.error('Error fetching fee records:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update an existing fee record by ID
const updateFeeRecord = async (req, res) => {
  try {
    const { feeAmount, studentClass, status, registrationNumber, studentName } = req.body;
    const { feeId } = req.params;

    // Find the fee record by ID and update the fields
    const updatedFee = await Fee.findByIdAndUpdate(
      feeId,
      {
        $set: {
          studentName: studentName || "Unknown",  // Default to "Unknown" if no student name is provided
          registrationNumber,
          feeAmount,
          class: studentClass || "Not Assigned", // Default to "Not Assigned" if no class is provided
          status,
        },
      },
      { new: true }  // Return the updated document
    );

    if (!updatedFee) {
      return res.status(404).json({ message: 'Fee record not found' });
    }

    res.status(200).json({ message: 'Fee record updated successfully', updatedFee });
  } catch (error) {
    console.error('Error updating fee record:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a fee record by ID
const deleteFeeRecord = async (req, res) => {
  try {
    const { feeId } = req.params;

    // Find the fee record by ID and delete it
    const deletedFee = await Fee.findByIdAndDelete(feeId);

    if (!deletedFee) {
      return res.status(404).json({ message: 'Fee record not found' });
    }

    res.status(200).json({ message: 'Fee record deleted successfully', deletedFee });
  } catch (error) {
    console.error('Error deleting fee record:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFeeRecords, createFeeRecord, updateFeeRecord, deleteFeeRecord };
