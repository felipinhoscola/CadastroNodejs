const express = require('express');
const Person = require('../models/person');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        let person = await Person.find();
        res.status(200).json(person);
    } catch (error) {
        res.status(500).json(error)
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
        res.status(200).json(person);
    } catch (error) {
        res.status(422).json(error)
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