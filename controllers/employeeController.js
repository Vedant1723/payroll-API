const Employee = require("../models/Employee");
require("dotenv").config();

//@GET Route
//@DESC Get Employee
exports.get = async (req, res) => {
  try {
    const emp = await Employee.find({ businessID: req.emp.id });
    res.json(emp);
  } catch (error) {
    console.log(error.message);
  }
};

//@POST Route
//@DESC Create Employee
exports.create = async (req, res) => {
  const { name, email, phone, address, salary, salaryType } = req.body;
  try {
    var empObj = {
      name: name,
      email: email,
      phone: phone,
      address: address,
      businessID: req.emp.id,
      salary: salary,
      salaryType: salaryType,
    };
    const emp = new Employee(empObj);

    await emp.save();
    res.json({ statusCode: 200, message: "Employee Created", data: emp });
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
    res.json({ statusCode: 200, message: "Successful", data: result });
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.json({ statusCode: 400, message: "ID is Invalid" });
    }
  }
};

//@Delete Route
//@DESC Delete Employee
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Employee.findByIdAndDelete(id);
    res.json({ statusCode: 200, message: "Successful", data: result });
  } catch (error) {
    console.log(error.message);
  }
};
