const express = require('express');
const Animals = require('../Model/Animals');

const router = express.Router();

// Add a new animal
router.post('/add', async (req, res) => {
    try {
        const animal = await Animals.create(req.body);
        res.status(201).json(animal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update an animal
router.put('/update/:id', async (req, res) => {
    try {
        const animal = await Animals.update(req.body, { where: { id: req.params.id } });
        res.status(200).json(animal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get an animal by name
router.get('/get/:name', async (req, res) => {
    try {
        const animal = await Animals.findOne({ where: { name: req.params.name } });
        if (!animal) {
            return res.status(404).json({ error: 'Animal not found' });
        }
        res.status(200).json(animal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all animals
router.get('/get', async(req, res) => {
    try {
        const animals = await Animals.findAll();
        res.status(200).json(animals);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all animals of a species
router.get('/get/:species', async(req, res) => {
    try 
        {const animals = await Animals.findAll({ where: { species: req.params.species } });
        if (animals.lengt === 0) {
            return res.status(404).json({ error: 'No animals found' });
        }
        res.status(200).json(animals);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an animal
router.delete('/delete/:id', async (req, res) => {
    try {
        const animal = await Animals.destroy({ where: { id: req.params.id } });
        res.status(200).json(animal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;