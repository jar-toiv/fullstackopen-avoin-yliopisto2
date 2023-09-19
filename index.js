const express = require('express');
require('dotenv').config();
const errorHandler = require('./utils/errorHandler');
const morgan = require('morgan');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const connectToDB = require('./services/database');

const personController = require('./controllers/personController');

const app = express();

app.use(express.json());
app.use(express.static('dist'));
app.use(cors());

connectToDB();

morgan.token('body', function (req) {
  return JSON.stringify(req.body);
});

const format =
  ':method :url :status :res[content-length] - :response-time ms :body';

app.use(morgan(format));

app.get('/info', personController.getInfo);
app.get('/api/persons', personController.getPersons);
app.post('/api/persons', personController.createPerson);
app.get('/api/persons/:id', personController.getPersonById);
app.delete('/api/persons/:id', personController.deletePerson);
app.put('/api/persons/:id', personController.updatePerson);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
