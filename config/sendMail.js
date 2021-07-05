const mailer = require("./Mailer");
const Transport = require("./Transport");

const sendMail = async (reciever, subject, body) => {
  const msg = {
    to: reciever,
    subject: subject,
    html:
      "<div style='font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2;'><div style='margin:50px auto;width:70%;padding:20px 0'><div style='border-bottom:1px solid #eee'><a href='' style='font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600'>Payroll</a></div><p style='font-size:1.1em'>Hi " +
      body.name +
      ",</p><p>Thank you for choosing Payroll. Use the following OTP to complete your Sign Up process. OTP is valid for 5 minutes. Good luck!</p><h2 style='background: #00466a;margin: 0;width: max-content;padding: 0 10px;color: #fff;border-radius: 8px;'>" +
      body.otp +
      "</h2><p style='font-size:0.9em;'>Welcome to<br />Payroll</p><hr style='border:none;border-top:1px solid #eee' /><div style='float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300'><p>Payroll</p><p>California</p></div></div></div>",
  };

  await mailer(Transport, msg);
};

module.exports = sendMail;
