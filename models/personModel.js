const mongoose = require('mongoose');

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, 'Name must be be at least 3 characters long.'],
      required: [true, 'A person must have a name.'],
    },
    number: {
      type: String,
      required: [true, 'A person must have a number '],
      minlength: [8, 'Phone number must be at least 8 characters long.'],
      validate: {
        validator: function (v) {
          return /^(\d{2,3})-(\d{5,8})$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid phone number! A valid phone number should be in the format: 09-1234556 or 040-22334455`,
      },
    },
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
