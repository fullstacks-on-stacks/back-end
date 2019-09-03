const mongoose = require('mongoose');

const barSchema = new mongoose.Schema({
  name: String,
  address: String,
  notes: String
});

module.exports = mongoose.model('Bar', barSchema);
