const Employee = require("../models/Employee");
require("dotenv").config();
const Salary = require("../models/Salary");

//@GET Route
//@DESC Get Employee
exports.getEmployees = async (req, res) => {
  try {
    const emp = await Employee.find({ businessID: req.emp.id });
    res.json(emp);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getSpecificEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    return res.json(employee);
  } catch (error) {
    console.log(error.message);
  }
};

//@POST Route
//@DESC Create Employee
exports.createEmployee = async (req, res) => {
  const { name, email, phone, address, salary, salaryType } = req.body;
  try {
    var empObj = {
      name: name,
      email: email,
      phone: parseInt(phone),
      address: address,
      businessID: req.emp.id,
      salary: parseInt(salary),
      salaryType: salaryType,
    };
    const emp = new Employee(empObj);

    await emp.save();

    const salaryObj = {
      amount: parseInt(salary),
      empID: emp.id,
      businessID: req.emp.id,
      type: salaryType,
    };
    var salaryDB = new Salary(salaryObj);
    await salaryDB.save();
    res.json({ statusCode: 200, message: "Employee Created", data: emp });
  } catch (error) {
    console.log(error.message);
  }
};

//@PUT Route
//@DESC Update Employee
exports.updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const options = { new: true };
    const result = await Employee.findByIdAndUpdate(id, update, options);
    res.json({ statusCode: 200, message: "Employee Updated!", data: result });
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ statusCode: 400, message: "ID is Invalid" });
    }
  }
};

//@Delete Route
//@DESC Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Employee.findByIdAndDelete(id);
    res.json({ statusCode: 200, message: "Employee Deleted!", data: result });
  } catch (error) {
    console.log(error.message);
  }
};
