const mongoose = require("mongoose");

const SalarySchema = new mongoose.Schema({
  empID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  businessID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  date: { type: Date, default: Date.now() },
  amount: { type: Number },
  type: { type: String },
  status: { default: "unpaid", type: String },
});

module.exports = Salary = mongoose.model("Salary", SalarySchema);
