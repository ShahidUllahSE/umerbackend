const nodemailer = require("nodemailer");
const fs = require("fs").promises;
const path = require("path");

const sendAdmissionEmail = async (email, studentDetails) => {
  try {
    const templatePath = path.resolve(__dirname, "../views/registerationTemplete.html"); // Update the template path if needed
    const template = await fs.readFile(templatePath, "utf-8");

    // Replace placeholders in the email template
    const htmlContent = template
      .replace(/{{studentName}}/g, studentDetails.studentName)
      .replace(/{{parentName}}/g, studentDetails.parentName)
      .replace(/{{studentClass}}/g, studentDetails.studentClass)
      .replace(/{{gender}}/g, studentDetails.gender)
      .replace(/{{contact}}/g, studentDetails.contact)
      .replace(/{{address}}/g, studentDetails.address);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL, // Send email to the admin email
      subject: "New Admission Submitted",
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email. Please try again later.");
  }
};

module.exports = sendAdmissionEmail;
