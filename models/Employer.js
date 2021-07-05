const mongoose = require("mongoose");
const EmployerSchema = new mongoose.Schema({
  businessName: {
    type: String,
  },
  ownerName: {
    type: String,
  },
  businessType: {
    type: String,
  },
  noOfEmployess: {
    type: Number,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Employer = mongoose.model("Employer", EmployerSchema);
