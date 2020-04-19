const express = require('express');
const app = express();

app.use(express.json());

app.get('/projects', (request, response) => {
  return response.json([
    'project 1',
    'project 2'
  ])
})
app.post('/projects', (request, response) => {
  return response.json([
    'project 1',
    'project 2'
  ])
})
app.put('/projects/:id', (request, response) => {
  return response.json([
    'project 1',
    'project 2'
  ])
})
app.delete('/projects/:id', (request, response) => {
  return response.json([
    'project 1',
    'project 2'
  ])
})

app.listen(3333, () => {
  const message = " 🚀 The server is running.";
  console.log('\x1b[30;48;5;82m' + message + '\x1b[0m');
});