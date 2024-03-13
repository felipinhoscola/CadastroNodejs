const express = require('express');
const Task = require('../models/task');
const Person = require('../models/person');

const personDependentRoute = express.Router();
const simpleRoute = express.Router();

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

simpleRoute.delete('/:id', async (req, res) => {
    try {
        let task = await Task.findByIdAndDelete(req.params.id);
        let person = await Person.findById(task.person);
        let taskRemove = person.tasks.indexOf(task._id);
        person.tasks.slice(taskRemove, 1);
        person.save();
        res.redirect(`/persons/${person._id}`)
    } catch (error) {
        res.status(422).render('pages/error', { erros: "Erro ao excluir tarefa" })
    }
})

simpleRoute.put('/:id', async (req, res) => {
    let task = await Task.findById(req.params.id);
    try {
        task.set(req.body.task);
        await task.save();
        res.status(200).json({ task })
    } catch (error) {
        let errors = error.errors
        res.status(422).json({ task: { ...errors } });
    }
})


module.exports = {
    personDependent: personDependentRoute,
    simple: simpleRoute
}