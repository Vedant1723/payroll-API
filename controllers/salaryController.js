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
    // Modify salary Amount here
    salary.amount = salary.amount + amount;

    await salary.save();
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

    // Modifying Salary Amount
    var allowance = await Allowance.findById(req.params.allowanceID);

    var salary = await Salary.findById(allowance.salaryID);

    if (allowance.amount > amount) {
      var total = allowance.amount - amount;
      salary.amount = salary.amount + total;
    } else {
      var total = amount - allowance.amount;
      salary.amount = salary.amount - total;
    }
    await salary.save();

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
    // Modifying Salary Amount
    var allowance = await Allowance.findById(req.params.allowanceID);

    var salary = await Salary.findById(allowance.salaryID);

    salary.amount = salary.amount - allowance.amount;

    await salary.save();

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

    salary.amount = salary.amount - amount;

    await salary.save();

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

    // Modifying salary amount
    var cut = await Cut.findById(req.params.cutID);

    var salary = await Salary.findById(cut.salaryID);

    if (cut.amount > amount) {
      var total = cut.amount - amount;
      salary.amount += total;
    } else {
      var total = amount - cut.amount;
      salary.amount -= total;
    }

    await salary.save();

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
    // Modifying salary amount
    var cut = await Cut.findById(req.params.cutID);

    var salary = await Salary.findById(cut.salaryID);

    salary.amount += cut.amount;
    await salary.save();

    await Cut.findByIdAndDelete(req.params.cutID);

    return res.json({ statusCode: 200, message: "Cut removed!" });
  } catch (error) {
    console.log(error.message);
  }
};

exports.createSalary = async (req, res) => {
  try {
    var employee = await Employee.findById(req.params.id);

    const { amount } = req.body;
    const salaryObj = {
      amount: amount,
      empID: employee.id,
      businessID: req.emp.id,
      type: employee.salaryType,
    };
    var salary = new Salary(salaryObj);
    await salary.save();
    return res.json({
      statusCode: 200,
      message: "Salary Created!",
      salary: salary,
      employee: employee,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.paySalary = async (req, res) => {
  try {
  } catch (error) {}
};

// *----------------***Salary***----------------------*/
