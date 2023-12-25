import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// nodemailer transporter to send OTP email to user
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.error(err);
  } else {
    console.log(success);
  }
});

const sendOTPEmail = async (to, otp) => {
  const mailOptions = {
    from: process.env.MAIL_ADDRESS,
    to: to,
    subject: "OTP for Verification",
    html: `<p>Your OTP is: <b>${otp}</b> </p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw err;
  }
};

export default sendOTPEmail;
