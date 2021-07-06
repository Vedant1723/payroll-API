const Salary = require('../models/Salary');
const Allowance = require('../models/Allowance');
const Cut = require('../models/Cut');

require('dotenv').config();

//@GET route
//@DESC GET all Allowances
exports.getAllAllowances = async (req, res) => {
  try {
    const salAllowances = await Allowance.find(businessId);
    res.json({
      statusCode: 200,
      message: 'All allowances on salary retrieved',
      data: salAllowances,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//@GET route
//@DESC GET Allowance
exports.getAllowance = async (req, res) => {
  const { businessId } = req.params.id;
  try {
    const salAllowance = await Allowance.findOne(businessId);
    res.json({
      statusCode: 200,
      message: 'All allowances on salary retrieved',
      data: salAllowance,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//@POST route
//@DESC ADD Allowance
exports.addAllowance = async (req, res) => {
  const { businessId } = req.params.id;
  const { empId, salarysId, date, amount, details, status } = req.body;
  try {
    var allObj = {
      empId: empId,
      businessId: businessId,
      salarysId: salarysId,
      date: date,
      amount: amount,
      details: details,
      status: status,
    };
    const newObj = new Allowance(allObj);
    await newObj.save();
    res.json({
      statusCode: 200,
      message: 'Allowance added',
      data: newObj,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//@PUT route
//@DESC UPDATE Allowance
exports.updateAllowance = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const options = { new: true };
    const result = await Allowance.findByIdAndUpdate(id, update, options);
    res.json({
      statusCode: 200,
      message: 'Allowance updated',
      data: result,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//@DELETE route
//@DESC DELETE Allowance
exports.deleteAllowance = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Allowance.findByIdAndDelete(id);
    res.json({ statusCode: 200, message: 'Successful', data: result });
  } catch (error) {
    console.log(error.message);
  }
};

//@GET route
//@DESC GET ALL CUTS
exports.getAllCuts = async (req, res) => {
  try {
    const getAllCuts = await Cut.find(businessId);
    res.json({
      statusCode: 200,
      message: 'All Cuts on salary',
      data: getAllCuts,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//@GET route
//@DESC GET CUTS
exports.getCuts = async (req, res) => {
  try {
    const { businessId } = req.params.id;
    try {
      const salcut = await Cut.findOne(businessId);
      res.json({
        statusCode: 200,
        message: 'Cut on salary',
        data: salcut,
      });
    } catch (error) {
      console.log(error.message);
    }
  } catch (error) {
    console.log(error.message);
  }
};

//@POST route
//@DESC ADD CUTS
exports.addCuts = async (req, res) => {
  const { businessId } = req.params.id;
  const { empId, salarysId, date, amount, details, status } = req.body;
  try {
    var allObj = {
      empId: empId,
      businessId: businessId,
      salarysId: salarysId,
      date: date,
      amount: amount,
      details: details,
      status: status,
    };
    const newObj = new Cut(allObj);
    await newObj.save();
    res.json({
      statusCode: 200,
      message: 'Cut added',
      data: newObj,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//@PUT route
//@DESC UPDATE CUTS
exports.updateCuts = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const options = { new: true };
    const result = await Cut.findByIdAndUpdate(id, update, options);
    res.json({
      statusCode: 200,
      message: 'Cut updated',
      data: result,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//@DELETE route
//@DESC DELETE CUTS
exports.deleteCuts = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Cut.findByIdAndDelete(id);
    res.json({ statusCode: 200, message: 'Cut deleted', data: result });
  } catch (error) {
    console.log(error.message);
  }
};
