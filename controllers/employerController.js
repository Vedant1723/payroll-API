const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const otpGenerator = require("../config/otpGenerator");
const Employer = require("../models/Employer");
const sendMail = require("../config/sendMail");
const Otp = require("../models/Otp");
const Employee = require("../models/Employee");
require("dotenv").config();
const Attendance = require("../models/Attendance");
const moment = require("moment");
const Task = require("../models/Task");

// *-----------------***Auth**-----------------------*/

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

// *-----------------***Auth**-----------------------*/

// *----------------***Attendance***----------------------*/

exports.getAttendanceByMonth = async (req, res) => {
  try {
    const month = req.params.month;

    // Check if Employee exists or not
    var employee = await Employee.findById(req.params.empID);

    if (!employee) {
      return res.json({ statusCode: 400, message: "Employee ID is Invalid!" });
    }
    var attendances = await Attendance.find({
      businessID: req.emp.id,
      employeeID: req.params.empID,
    });

    // Attendance filter by Passed Month
    var result = attendances.filter((att) => {
      if (
        moment(att.date).format("MM") == month &&
        Date.now() >= employee.date
      ) {
        return att;
      }
    });

    return res.json(result);
  } catch (error) {
    console.log(error.message);
  }
};

exports.markAttendance = async (req, res) => {
  try {
    // markAs => Present/Absent/Leave
    const markAs = req.params.markAs;

    // Check if Employee exists or not
    var employee = await Employee.findById(req.params.empID);

    if (!employee) {
      return res.json({ statusCode: 400, message: "Employee ID is Invalid!" });
    }

    var attObj = {
      markAs: markAs,
      reason: markAs == "Absent" || markAs == "Leave" ? req.body.reason : "",
      employeeID: req.params.empID,
      businessID: req.emp.id,
      isPaid: markAs == "Leave" ? req.body.isPaid : false,
    };

    // If current's date attendace is already given then update it else create it
    var attendances = await Attendance.find({
      employeeID: req.params.empID,
      businessID: req.emp.id,
    });

    var attendance;
    // Attendance filter by today Date
    var result = attendances.filter((att) => {
      if (
        moment(att.date).format("DD-MM-YYYY") ==
        moment(Date.now()).format("DD-MM-YYYY")
      ) {
        return att;
      }
    });

    if (result.length > 0) {
      attendance = result[0];

      // Updating
      var newAtt = await Attendance.findByIdAndUpdate(attendance._id, attObj, {
        new: true,
      });
      return res.json({ statusCode: 200, message: "Attendance Updated!" });
    } else {
      // Creating
      var newAtt = new Attendance(attObj);
      await newAtt.save();
      return res.json({ statusCode: 200, message: "Attendance Marked!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// *----------------***Attendance***----------------------*/

// *----------------***Task***----------------------*/

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    var task = new Task({ title, description, empID: req.emp.id });
    await task.save();

    return res.json({
      statusCode: 200,
      message: "Task Created!",
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getTasks = async (req, res) => {
  try {
    var tasks = await Task.find({ empID: req.emp.id });
    return res.json(tasks);
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    var task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    return res.json({
      statusCode: 200,
      message: "Task Updated!",
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    return res.json({
      statusCode: 200,
      message: "Task Deleted!",
    });
  } catch (error) {
    console.log(error.message);
  }
};
// *----------------***Task***----------------------*/
