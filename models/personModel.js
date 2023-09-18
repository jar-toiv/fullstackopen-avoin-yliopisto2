const mongoose = require('mongoose');

const personSchema = new mongoose.Schema(
  {
    name: String,
    number: String,
  },
  { collection: 'person' }
);

//¤ https://mongoosejs.com/docs/api/document.html#transform

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
