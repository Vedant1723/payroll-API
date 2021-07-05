const mongoose = require('mongoose');
const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
  businessID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  salary: {
    type: Number,
  },
  salaryType: {
    type: String,
  },
});

module.exports = Employee = mongoose.model('Employee', EmployeeSchema);
