const express = require('express');
const { Fosters } = require('../Model/Fosters');
const { validateFoster } = require('../Validation/fosterValidation');

const router = express.Router();

// Add a new foster
router.post('/add', validateFoster(true), async (req, res) => {
    try {
        const foster = await Fosters.create(req.body);
        res.status(201).json(foster);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a foster
router.put('/update/:id', validateFoster(false), async (req, res) => {
    try {
        const [updated] = await Fosters.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedFoster = await Fosters.findOne({ where: { id: req.params.id } });
            res.status(200).json(updatedFoster);
        } else {
            res.status(404).json({ error: 'Foster not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get a foster by name
router.get('/get/by-name/:name', async (req, res) => {
    try {
        const foster = await Fosters.findOne({ where: { name: req.params.name } });
        if (!foster) {
            return res.status(404).json({ error: 'Foster not found' });
        };
        res.status(200).json(foster);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all fosters
router.get('/get', async (req, res) => {
    try {
        const fosters = await Fosters.findAll();
        res.status(200).json(fosters);
    } catch (error) {
        res.status(400). json({ error: error.message });
    }
});

// Get all fosters by specialization
router.get('/get/by-spec/:spec', async (req, res) => {
    try {
        const fosters = await Fosters.findAll({ where: {
            specialization: req.params.spec} 
        });
        if (fosters.length === 0) {
            return res.status(404).json({ error: 'No fosters found' });
        };
        res.status(200).json(fosters);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a foster
router.delete('/delete/:id', async (req, res) => {
    try {
        const foster = await Fosters.destroy({ where: { id: req.params.id } });
        if (!foster) {
            return res.status(404).json({ error: 'Foster not found' });
        }
        res.status(200).json({ message: `Foster deleted successfully` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = router;