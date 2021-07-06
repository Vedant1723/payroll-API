const nodemailer = require("nodemailer");

const mailer = async (transport, mailOptions) => {
  await transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent", info);
  });
};

module.exports = mailer;
