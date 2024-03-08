const express = require('express');
const Person = require('../models/person');
const Task = require('../models/task');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        let person = await Person.find().populate('tasks');
        //res.status(200).json(person);
        console.log(person)
        res.status(200).render('person/index', { persons: person });
    } catch (error) {
        console.log(error.message)
        res.status(400).render('pages/error', { error: error.message });
    }
})

router.post('/', async (req, res) => {
    let { name, email, tel } = req.body;

    try {
        let person = await Person.create({ name, email, tel });
        res.status(200).json(person);
    } catch (error) {
        res.status(422).json(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        let person = await Person.findById(req.params.id);
        //res.status(200).json(person);
        res.status(200).render('person/index', { person: person });
    } catch (error) {
        res.status(200).render('pages/error', { error: 'Erro ao buscar id no banco de dados' });
    }
})

router.put('/:id', async (req, res) => {
    let { name, email, tel } = req.body;

    try {
        let person = await Person.findByIdAndUpdate(req.params.id, { name, email, tel }, { new: true });
        res.status(200).json(person);
    } catch (error) {
        res.status(422).json(error)
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