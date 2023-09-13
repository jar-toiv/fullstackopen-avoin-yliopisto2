const express = require('express');
const app = express();

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.use(express.json());

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = +req.params.id;
  const person = persons.find((person) => person.id === id);

  if (!person)
    return res
      .status(404)
      .json({ message: 'Not Found: No person with that ID' });

  res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = +req.params.id;
  const updatedPersons = persons.filter((person) => person.id !== id);
  if (updatedPersons.length === persons.length) {
    return res
      .status(404)
      .json({ message: 'Not Found: No person with that ID' });
  }
  //! Updating old array with new, but contant persons object does not allow it. Postman delete url: http://localhost:3001/api/persons/1
  persons = updatedPersons;

  res.status(204).end();
  console.log('New Persons array', persons);
});

const contacts = {
  content: `Phonebook has info for ${persons.length} people.`,
  date: new Date().toString(),
};

app.get('/info', (req, res) => {
  res.send(`<p>${contacts.content}</p><p>${contacts.date}</p>`);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
