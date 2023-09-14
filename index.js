const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(express.static('dist'));
app.use(cors());

morgan.token('body', function (req, res) {
  return JSON.stringify(req.body);
});

const format =
  ':method :url :status :res[content-length] - :response-time ms :body';

app.use(morgan(format));

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

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
  persons = updatedPersons;

  res.status(204).end();
  console.log('New Persons array', persons);
});

app.post('/api/persons', (req, res) => {
  const randomId = Math.floor(Math.random() * (999 - 0) + 1);
  const compareNewName = persons.find(
    (person) =>
      person.name.toLocaleLowerCase() === req.body.name.toLocaleLowerCase()
  );

  if (!req.body.name || !req.body.number) {
    return res.status(400).json({
      error: 'Add name and number',
    });
  }
  if (compareNewName)
    return res.status(409).json({ error: 'Name must be unique' });

  const compareRandomId = persons.find((person) => person.id === randomId);

  if (compareRandomId)
    return res
      .status(400)
      .json({ message: 'Something went wrong, please add person again.' });

  const newPersonObj = {
    id: randomId,
    name: req.body.name,
    number: req.body.number,
  };

  persons.push(newPersonObj);

  res.status(200).json({
    message: 'success',
    success: 'Person added successfully',
    contact: newPersonObj,
  });
});

const contacts = {
  content: `Phonebook has info for ${persons.length} people.`,
  date: new Date().toString(),
};

app.get('/info', (req, res) => {
  res.send(`<p>${contacts.content}</p><p>${contacts.date}</p>`);
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
