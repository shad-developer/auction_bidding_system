const nodemailer = require("nodemailer");

module.exports = async (email, subject, htmlTemplate) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      // For mailtrap, we don't need to set `secure` since it usually works with plaintext.
      secure: false,
    });

    await transporter.sendMail({
      from: `${process.env.FROM_NAME}  <${process.env.USER}>`,
      to: email,
      subject: subject,
      html: htmlTemplate,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
};
