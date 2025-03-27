const express = require('express');
const FosterLogin = require('../Model/FosterLogin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Add a new user to foster login
// still need to add email and password verification
router.post('/add', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ error: 'Username, Password, and Email are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await FosterLogin.create({
            username,
            password: hashedPassword,
            email,
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
});

// Add a login attempt/session
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and Password are required'})
        }

        // find user by their email
        const user = await FosterLogin.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: `Login failed: User with email ${email} not found`});
        }

        // Check if the user is active
        if (!user.is_active) {
            
            return res.status(401).json({ error: 'User is not active'});
        }

        // Compare the hashed password with the entered password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            user.failed_login_count += 1;
            if (user.failed_login_count >= 3) {
                user.is_active = false; // Lock the user account
                console.warn(`Account is locked for user with email ${email} due to multiple failed login attempts`); 
            }

            await user.save();

            return res.status(401).json({ error: 'Invalid email or password'});
        }

        // On successful login, reset the failed login count
        user.failed_login_count = 0;
        await user.save();

        // Generate a JWT token
        const token = jwt.sign({ id: user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({message: 'Login successful', token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

// Update a user in foster login
router.put('/update/:id', async (req, res) => {
    try {
        const user = await FosterLogin.update(req.body, { where: { id: req.params.id } });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Reset a user's password/unlock account

// Get all users in foster login
router.get('/get', async (req, res) => {
    try {
        const users = await FosterLogin.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
});

// Delete a user in foster login
router.delete('/delete/:id', async (req, res) => {
    try {
        const user = await FosterLogin.destroy({ where: { id: req.params.id } });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});