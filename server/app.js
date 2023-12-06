import express from 'express';
import { tasks } from './data.js';

const app = express();

app.listen(3000, () =>
  console.log('Listening on port 3000'),
);

app.get('/tasks', (req, res) => {
  res.json(tasks);
});