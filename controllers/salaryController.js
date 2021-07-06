const Allowance = require("../models/Allowance");
const Salary = require("../models/Salary");
const Employer = require("../models/Employer");
const Employee = require("../models/Employee");
const Cut = require("../models/Cut");

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
    const { amount, details } = req.body;

    var allowanceObj = {
      businessID: req.emp.id,
      amount: amount,
      salaryID: salary.id,
      details: details,
    };

    await Allowance.findOneAndUpdate(
      { _id: req.params.allowanceID },
      { $set: allowanceObj },
      { new: true }
    );
    return res.json({ statusCode: 200, message: "Allowance Updated!" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteAllowance = async (req, res) => {
  try {
    await Allowance.findByIdAndDelete(req.params.allowanceID);

    return res.json({ statusCode: 200, message: "Allowance removed!" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getCut = async (req, res) => {
  try {
    const cut = await Cut.find({ salaryID: req.params.salaryID });
    return res.json(cut);
  } catch (error) {
    console.log(error.message);
  }
};

exports.createCut = async (req, res) => {
  try {
    const { amount, details } = req.body;

    // Fetch Employee from Salary
    var salary = await Salary.findById(req.params.salaryID);

    if (!salary) {
      return res.json({ statusCode: 400, message: "Salary ID is not Valid!" });
    }

    var cutObj = {
      businessID: req.emp.id,
      empID: salary.empID,
      amount: amount,
      salaryID: salary.id,
      details: details,
    };

    // Create Cut
    var cut = new Cut(cutObj);

    await cut.save();

    return res.json({ statusCode: 200, message: "Cut Added!" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateCut = async (req, res) => {
  try {
    const { amount, details } = req.body;

    var cutObj = {
      businessID: req.emp.id,
      amount: amount,
      salaryID: salary.id,
      details: details,
    };

    await Cut.findOneAndUpdate(
      { _id: req.params.cutID },
      { $set: cutObj },
      { new: true }
    );
    return res.json({ statusCode: 200, message: "Cut Updated!" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteCut = async (req, res) => {
  try {
    await Cut.findByIdAndDelete(req.params.cutID);

    return res.json({ statusCode: 200, message: "Cut removed!" });
  } catch (error) {
    console.log(error.message);
  }
};

// *----------------***Salary***----------------------*/
