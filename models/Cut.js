const mongoose = require("mongoose");

const CutsSchema = new mongoose.Schema({
  empId: { type: String },
  businessId: { type: String },
  salarysId: { type: String },
  date: { type: Date, default: Date.now() },
  amount: { type: Number },
  details: { type: String },
});

module.exports = Cut = mongoose.model("Cut", CutsSchema);
