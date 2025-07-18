const express = require('express');
const FosterLogin = require('../Model/FosterLogin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer'); // make sure to set up the env variables for nodemailer

const { body, validationResult } = require('express-validator');
const userValidationRules = require('./helper-functions/userValidations');


const router = express.Router();

// Add a new user to foster login
router.post('/add', userValidationRules, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

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
            
            return res.status(401).json({ error: 'User account is locked due to multiple failed login attempts' });
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

// Get current user
router.get('/current-user', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: no token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await FosterLogin.findOne({ where: { id: decoded.id }, attributes: { excluded: ['password'] } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({ error: 'User not found' });
    }
});

// Update a user in foster login
router.put('/update/:id', userValidationRules, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    try {
        const { password, ...otherFields } = req.body;
        const userId = req.params.id;

        const user = await FosterLogin.findOne({ where: { id: userId }});

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            otherFields.password = hashedPassword;
        }

        await FosterLogin.update(otherFields, { where: { id: userId }});

        const updatedUser = await FosterLogin.findOne({
            where: { id: userId},
            attributes: { exclude: ['password'] } // Exclude the password field
        });

        res.status(200).json({ message: 'user updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Reset a user's password/unlock account
router.post('/reset-password', userValidationRules, async (req, res) => {
    try {
        const { email } = req.body;

        const user = await FosterLogin.findOne({ where: { email }})
        if(!user) {
            return res.status(404).json({ error: `User with email ${email} not found` });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(4).toString('hex');
        const resetTokenExpires = (Date.now() + 3600000); // 3,600,000 == 1 hour expiration

        // Saving the token and expiration to the user
        user.reset_token = resetToken;
        user.reset_token_expires = resetTokenExpires;

        // Send the reset token to the user's email
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        // can enhance imaging by using an HTML template for the email.
        // Think about including a direct link to the reset page
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Account Unlock - Password Reset Required',
            text: `It appears your account has been locked and you are attempting to reset your password. If you have not requested this, please ignore this email and notify us. Otherwise, please copy the password reset token below and use it to reset your password.\n\nReset Token: ${resetToken}\n\nThis token will expire in 1 hour.`,
        }

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Password reset initiated. A reset token has been sent to your email.'})
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Verify the token
router.post('/verify-token', async (req, res) => {
    try {
    const { email, resetToken } = req.body;

    const user = await FosterLogin.findOne({ where: { email }});
    if (!user) {
        return res.status(404).json({ error: `User with email ${email} not found` });
    }

    if (user.reset_token !== resetToken) {
        return res.status(401).json({ error: 'Reset token is invalid or expired'});
    }
    if (Date.now() > user.reset_token_expires) {
        user.reset_token = null;
        user.reset_token_expires = null;
        await user.save();
        return res.status(400).json({ error: 'The reset token has expired'})
    }

    // unlock user's account
    user.reset_token = null;
    user.reset_token_expires = null;
    user.is_active = true;
    await user.save();

    res.status(200).json({ message: `Account unlocked successfilly. Please login with your new password`});
    } catch (error) {
        res.status(400).json({ error: `Account unlock failed: ${error.message}` });
    }
});

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
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted succesfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;