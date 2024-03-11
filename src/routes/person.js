const express = require('express');
const Person = require('../models/person');
const Task = require('../models/task');
const person = require('../models/person');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        let person = await Person.find().populate('tasks');
        //res.status(200).json(person);
        res.status(200).render('person/index', { persons: person });
    } catch (error) {
        res.status(400).render('pages/error', { error: error.message });
    }
})

router.get('/new', async (req, res) => {
    try {
        let person = new Person();
        res.status(200).render('person/new', { person: person });
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Erro ao carregar formulário para novo cadastro!' });
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        let person = await Person.findById(req.params.id);
        res.status(200).render('person/edit', { person: person })
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Erro ao carregar formulário para atualizar cadastro!' });
    }
})

router.post('/', async (req, res) => {
    let { name, email, tel } = req.body.person;
    let person = new Person({ name, email, tel });

    try {
        await person.save();
        res.redirect('/persons');
    } catch (error) {
        res.status(422).render('person/new', { person: { ...person, error } })
    }
})

router.get('/:id', async (req, res) => {
    try {
        let person = await Person.findById(req.params.id);
        //res.status(200).json(person);
        res.status(200).render('person/show', { person: person });
    } catch (error) {
        res.status(200).render('pages/error', { error: 'Erro ao buscar id no banco de dados' });
    }
})

router.put('/:id', async (req, res) => {
    let { name, email, tel } = req.body.person;
    let person = await Person.findById(req.params.id)

    try {
        await person.updateOne({ name, email, tel });//erro aqui
        res.redirect('/persons')
    } catch (error) {
        let errors = error.errors;
        console.log(error);
        res.status(422).render(`person/edit`, { person: { ...person, errors } })
    }
})

router.delete('/:id', async (req, res) => {
    let { name, email, tel } = req.body;

    try {
        let person = await Person.findByIdAndRemove(req.params.id);
        res.status(200).json(person);
    } catch (error) {
        res.status(422).json(error)
    }
})

module.exports = router