const mongoose = require('mongoose');

// Enum for fee status (due or paid)
const feeStatusEnum = ['due', 'paid'];

// Fee Schema
const feeSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
    },
    feeAmount: {
      type: Number,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: feeStatusEnum,
      required: true,
    },
    // Reference to the User model (student)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Name of the User model
      required: false, // Optional field, link to user who created the fee record
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Static method to check if a fee record already exists for the student and class
feeSchema.statics.checkUniqueFee = async function (registrationNumber, className) {
  const existingFee = await this.findOne({ registrationNumber, class: className });
  return !existingFee; // Return true if fee record for this student and class combination doesn't exist, false otherwise
};

const Fee = mongoose.model('Fee', feeSchema);

module.exports = Fee;
