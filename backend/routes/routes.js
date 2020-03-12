const { Router } = require('express');
const app = Router();
const controller = require('../controllers/main.controller.js')
app.get('/', controller.notes);
app.post('/', controller.createNote);
app.get('/:id', controller.singleNote);
app.delete('/:id', controller.deleteNote);

module.exports = app;