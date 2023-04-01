const nodemailer = require("nodemailer");

const sendEmail = (payload) => {
  const emailCarrier = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailPayload = {
    from: process.env.EMAIL_FROM,
    to: payload.to,
    subject: payload.subject,
    html: payload.text,
  };

  emailCarrier.sendMail(mailPayload, function (err, info) {
    if (err) {
      console.log("EMAIL SENDING FAILED!!", err);
    } else {
      console.log("EMAIL SENT!!", info);
    }
  });
};

module.exports = sendEmail;
