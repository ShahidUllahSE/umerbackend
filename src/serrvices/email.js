const nodemailer = require("nodemailer");
const fs = require("fs").promises; // Use async promises-based API
const path = require("path");
const sendVerificationEmail = async (
  email,
  token,
  userName,
  userEmail,
  userRole
) => {
  try {
    const templatePath = path.resolve(
      __dirname,
      "../views/verifyEmail.template.html"
    );
    // Async reading of the template
    const template = await fs.readFile(templatePath, "utf-8");
    const verificationLink = `${process.env.FRONT_END_URL}/verify-email?token=${token}`;
    const approvalLink = `${process.env.FRONT_END_URL}/review-application?email=${userEmail}`;
    const htmlContent = template
      .replace("{{userName}}", userName)
      .replace("{{userEmail}}", userEmail)
      .replace("{{userRole}}", userRole)
      .replace("{{approvalLink}}", approvalLink);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "New Registration Pending Approval",
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
module.exports = sendVerificationEmail;