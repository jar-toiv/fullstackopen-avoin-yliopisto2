const mongoose = require('mongoose');

const personSchema = new mongoose.Schema(
  {
    name: String,
    number: Number,
  },
  { collection: 'person' }
);

module.exports = mongoose.model('Person', personSchema);
