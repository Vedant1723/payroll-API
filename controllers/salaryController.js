const Allowance = require("../models/Allowance");
const Salary = require("../models/Salary");
const Employer = require("../models/Employer");
const Employee = require("../models/Employee");

// *----------------***Salary***----------------------*/

exports.getAllowances = async (req, res) => {
  try {
    const allowances = await Allowance.find({ salaryID: req.params.salaryID });
    return res.json(allowances);
  } catch (error) {
    console.log(error.message);
  }
};

exports.createAllowance = async (req, res) => {
  try {
    const { amount, details } = req.body;

    // Fetch Employee from Salary
    var salary = await Salary.findById(req.params.salaryID);

    if (!salary) {
      return res.json({ statusCode: 400, message: "Salary ID is not Valid!" });
    }

    var allowanceObj = {
      businessID: req.emp.id,
      empID: salary.empID,
      amount: amount,
      salaryID: salary.id,
      details: details,
    };

    // Create Allowance
    var allowance = new Allowance(allowanceObj);

    await allowance.save();

    return res.json({ statusCode: 200, message: "Allowance Added!" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateAllowance = async (req, res) => {
  try {
  } catch (error) {}
};

exports.deleteAllowance = async (req, res) => {
  try {
  } catch (error) {}
};
// *----------------***Salary***----------------------*/
