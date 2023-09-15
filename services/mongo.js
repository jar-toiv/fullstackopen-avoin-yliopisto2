require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Person = require('../models/personModel');

function connectToDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('connected to MongoDB phonebook');
      console.log('Phonebook:');
    })
    .catch((error) => {
      console.log('error connecting to DB phonebook', error.message);
    });
}

const password = process.argv[2];

// If only the password is provided, fetch all persons.
if (process.argv.length === 3) {
  connectToDB();

  Person.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}

// If name and number are also provided, add a new person.
else if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  connectToDB();

  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((response) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}

module.exports = connectToDB;
