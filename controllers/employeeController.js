const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
require('dotenv').config();

//@GET Route
//@DESC Get Employee
exports.get = async (req, res) => {
  try {
    const emp = await Employee.find({ businessID: req.user.id });
    res.json(emp);
  } catch (error) {
    console.log(error.message);
  }
};

//@POST Route
//@DESC Create Employee
exports.create = async (req, res) => {
  const { name, email, phone, address, date, salary, salaryType } = req.body;
  try {
    var empObj = {
      name: name,
      email: email,
      phone: phone,
      address: address,
      businessID: req.user.id,
      date: date,
      salary: salary,
      salaryType: salaryType,
    };
    const emp = new Employee(empObj);

    await emp.save();
    res.json({ statusCode: 200, message: 'Employee Created', data: emp });
  } catch (error) {
    console.log(error.message);
  }
};

//@PUT Route
//@DESC Update Employee
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const options = { new: true };
    const result = await Employee.findByIdAndUpdate(id, update, options);
    res.json({ statusCode: 200, message: 'Successful', data: result });
  } catch (error) {
    console.log(error.message);
  }
};

//@Delete Route
//@DESC Delete Employee
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Employee.findByIdAndDelete(id);
    res.json({ statusCode: 200, message: 'Successful', data: result });
  } catch (error) {
    console.log(error.message);
  }
};
