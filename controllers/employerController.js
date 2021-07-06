const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("../config/otpGenerator");
const Employer = require("../models/Employer");
const sendMail = require("../config/sendMail");
const Otp = require("../models/Otp");
require("dotenv").config();

// /*-----------------***Auth**-----------------------*/

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if Employer exists or not
    var emp = await Employer.findOne({ email });
    if (!emp) {
      return res.json({ statusCode: 404, message: "Employer not Found!" });
    }

    // Password Comparsion
    const isMatch = await bcrypt.compare(password, emp.password);
    if (!isMatch) {
      return res.json({ statusCode: 400, message: "Invalid Credentials!" });
    }

    let otp = new Otp({
      userID: emp.id,
      otp: otpGenerator(6),
    });

    await otp.save((err) => {
      if (err) return res.json({ statusCode: 500, message: err.message });
    });

    // Send OTP to the Respective employer
    sendMail(emp.email, "OTP Verification", {
      name: emp.ownerName,
      otp: otp.otp,
    });
    return res.json({
      statusCode: 200,
      message: "OTP Sent to " + emp.email,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.signup = async (req, res) => {
  try {
    const {
      businessName,
      email,
      password,
      ownerName,
      phone,
      businessType,
      noOfEmployess,
    } = req.body;

    // Check if Employer exists or not
    var emp = await Employer.findOne({ email });
    if (emp) {
      return res.json({ statusCode: 400, message: "Employer Already Exists!" });
    }

    emp = new Employer({
      businessName,
      email,
      password,
      ownerName,
      phone,
      businessType,
      noOfEmployess,
    });

    // Hashing the Password
    const salt = await bcrypt.genSalt(10);
    emp.password = await bcrypt.hash(password, salt);

    //Saving the emp into DB
    await emp.save();

    let otp = new Otp({
      userID: emp.id,
      otp: otpGenerator(6),
    });

    await otp.save((err) => {
      if (err) return res.json({ statusCode: 500, message: err.message });
    });

    // Send OTP to the Respective employer
    sendMail(emp.email, "OTP Verification", {
      name: emp.ownerName,
      otp: otp.otp,
    });
    return res.json({
      statusCode: 200,
      message: "OTP Sent to " + emp.email,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.confirmOTP = async (req, res) => {
  try {
    var otp = await Otp.findOne({ otp: req.body.otp });
    if (!otp) {
      return res.json({ statusCode: 400, message: "Otp is not Valid!" });
    }

    if (otp.isUsed) {
      return res.json({ statusCode: 400, message: "Otp is already Used!" });
    }

    var employer = await Employer.findById(otp.userID);

    // update the otp
    otp.isUsed = true;

    await otp.save();

    // Token Generation
    const payload = {
      emp: {
        id: employer.id,
      },
    };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: 360000000 },
      (err, token) => {
        if (err) throw err;
        return res.json({
          statusCode: 200,
          message: "OTP Verified",
          data: employer,
          token: token,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

// /*-----------------***/Auth**-----------------------*/
