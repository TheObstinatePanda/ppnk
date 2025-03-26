const express = require('express');
const Applicants = require('../Model/Applicants');

const router = express.Router()

// Add a new applicant
router.post('/add', async (req, res) => {
    try {
        const applicant = await Applicants.create(req.body);
        res.status(201).json(applicant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update an applicant
router.put('/update/:id', async (req, res) => {
    try {
        // Update the applicant record
        const [updated] = await Applicants.update(req.body, { where: { id: req.params.id } });

        // Confirm that the record was updated
        if (updated) {
            const updatedApplicant = await Applicants.findOne({ where: { id: req.params.id}})
            res.status(200).json(updatedApplicant);
        } else {
            res.status(404).json({ error: 'Applicant not found'});
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get an applicant by name
router.get('/get/by-name/:name', async (req, res) => {
    try {
        const applicant = await Applicants.findOne({ where: { name: req.params.name } });
        if (!applicant) {
            return res.status(404).json({ error: 'Applicant not found' });
        }
        res.status(200).json(applicant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all applicants
router.get('/get', async (req, res) => {
    try {
        const applicants = await Applicants.findAll();
        res.status(200).json(applicants);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all applicants by applying_for
router.get('/get/by-applying-for/:applying_for', async (req, res) => {
    try {
        const applicants = await Applicants.findAll({ where: { applying_for: req.params.applying_for } });
        if (applicants.length === 0) {
            return res.status(404).json({ error: 'No applicants found' });
        }
        res.status(200).json(applicants);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all applicants by restriced status
router.get('/get/by-restricted/:is_restricted', async (req, res) => {
    try {
        // Convert  the string param into a boolean
        const isRestricted = req.params.is_restricted === 'true';
        const applicants = await Applicants.findAll({ where: { is_restricted: isRestricted } });
        if (applicants.length === 0) {
            return res.status(404).json({ error: 'No restricted applicants found' });
        }
        res.status(200).json(applicants);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an applicant's record
router.delete('/delete/:id', async (req, res) => {
    try {
        const applicant = await Applicants.destroy({ where: { id: req.params.id} });
        if (applicant) {
            return res.status(200).json({ message: 'Applicant deleted successfully'});
        } else {
            return res.status(404).json({ error: 'Applicant not found'});
        }
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
});

module.exports = router;