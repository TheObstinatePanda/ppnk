const express = require('express');
const Rescues = require('../Model/Rescues');
const validateRescue = require('./helper-functions/rescueValidation');

const router = express.Router();

// Add a new rescue
router.post('/add', validateRescue(true), async (req, res) => {
    try {
        const rescue = await Rescues.create(req.body);
        res.status(201).json(rescue);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a rescue
router.put('/update/:id', validateRescue, async (req, res) => {
    try {
        const [updated] = await Rescues.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedRescue = await Rescues.findOne({ where: { id: req.params.id } });
            res.status(200).json(updatedRescue);
        } else {
            res.status(404).json({ error: 'Rescue not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all rescues
router.get('/get', async (req, res) => {
    try {
        const rescues = await Rescues.findAll();
        res.status(200).json(rescues);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get a rescue by name
router.get('/get/by-name/:name', async (req, res) => {
    try {
        const rescue = await Rescues.findOne({ where: { name: req.params.name } });
        if (!rescue) {
            return res.status(404).json({ error: 'Rescue not found' });
        }
        res.status(200).json(rescue);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a rescue
router.delete('/delete/:id', async (req, res) => {
    try {
        const rescue = await Rescues.destroy({ where: { id: req.params.id } });
        if (!rescue) {
            return res.status(404).json({ error: 'Rescue not found' });
        }
        res.status(200).json({ message: 'Rescue deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;