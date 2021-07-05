const mongoose = require('mongoose');
const EmployeeSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
  },
});
module.exports = Employee = mongoose.model('Employee', EmployeeSchema);
