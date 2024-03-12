const express = require('express');
const Task = require('../models/task');
const Person = require('../models/person');

const personDependentRoute = express.Router();

personDependentRoute.get('/:id/tasks/new', async (req, res) => {
    try {
        let task = new Task();
        res.status(200).render('tasks/new', {
            personId: req.params.id, task: task
        })
    } catch (error) {
        res.status(422).render('pages/error', { erros: "Erro ao carregar o formulário" })
    }
})

personDependentRoute.post('/:id/tasks', async (req, res) => {
    let { name } = req.body.task;
    let task = new Task({ name, person: req.params.id });

    try {
        await task.save();
        let person = await Person.findById(req.params.id);
        person.tasks.push(task);
        await person.save();
        res.redirect(`/persons/${req.params.id}`)
    } catch (error) {
        let errors = error.errors;
        res.status(422).render('tasks/new', { ...task, errors, personId: req.params.id })
    }
})

module.exports = { personDependent: personDependentRoute }