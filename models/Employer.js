const mongoose = require('mongoose');
const EmployerSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
  },
});
module.exports = Employer = mongoose.model('Employer', EmployerSchema);
