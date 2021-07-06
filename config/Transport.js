const nodemailer = require("nodemailer");
require("dotenv").config();

var Transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 5000,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

module.exports = Transport;
