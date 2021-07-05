const mongoose = require('mongoose');
const AttendanceSchema = new mongoose.Schema({
  markAs: {
    type: String,
  },
  reason: {
    type: String,
    default: '',
  },
  employeeID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  businessID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Attendance = mongoose.model('Attendance', AttendanceSchema);
