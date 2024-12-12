const Admission = require('../models/admissionModel');
const sendAdmissionEmail = require('../serrvices/registrationService');

const createAdmission = async (req, res) => {
  try {
    const { studentName, studentClass, parentName, gender, contact, address, email } = req.body;

    // Create the admission entry (without storing the email in the database)
    const admission = new Admission({
      studentName,
      studentClass,
      parentName,
      gender,
      contact,
      address,
    });

    await admission.save();

    // Send the email with admission details to the admin email (admin email is set in .env)
    await sendAdmissionEmail(
      email, // email from req.body (parent's email, if you want to send confirmation to parent)
      { studentName, studentClass, parentName, gender, contact, address } // Passing admission data for email template
    );

    res.status(201).json({ message: 'Admission created successfully', admission });
  } catch (error) {
    console.error('Error creating admission:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAdmission };
