const express = require('express');
const { uuid } = require('uuidv4');
const app = express();

app.use(express.json());

const projects = [];

app.get('/projects', (request, response) => {
  const { title, owner } = request.query;

  const result = title || owner
    ? projects.filter(project => (
      project.title.includes(title) || project.owner.includes(owner)
    ))
    : projects

  return response.json(result);
})

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;
  
  if (!title || !owner) {
    return response.status(400).json({ error: 'Title and owner is required.' });
  }
  
  const project = {
    id: uuid(),
    title,
    owner
  };
  projects.push(project);

  return response.json(project);

})
app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;
  const projectIndex = projects.findIndex(project => (project.id === id))

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.' })
  }

  const project = {
    id, 
    title: title ? title : projects[projectIndex].title, 
    owner: owner ? owner : projects[projectIndex].owner
  }

  projects[projectIndex] = project;

  return response.json(projects[projectIndex]);

})
app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;
  const projectIndex = projects.findIndex(project => (project.id === id))

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.' })
  }
  projects.splice(projectIndex, 1);

  return response.status(204).send();
})

app.listen(3333, () => {
  const message = " 🚀 The server is running.";
  console.log('\x1b[30;48;5;82m' + message + '\x1b[0m');
});