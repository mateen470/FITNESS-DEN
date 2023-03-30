import nodemailer from "nodemailer";

const sendEmail = (payload) => {
  const emailCarrier = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailPayload = {
    from: process.env.EMAIL_FROM,
    to: payload.to,
    subject: payload.subject,
    html: paylaod.text,
  };

  emailCarrier.sendMail(mailPayload, function (err, info) {
    if (err) console.log(err);
    console.log("EMAIL SENT SUCCESSFULLY!!", info);
  });
};

module.exports = sendEmail;
