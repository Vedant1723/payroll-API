const mailer = require("./Mailer");
const Transport = require("./Transport");

const sendMail = async (reciever, subject, body) => {
  const msg = {
    to: reciever,
    subject: subject,
    html: body,
  };
  await mailer(Transport, msg);
};

module.exports = sendMail;
