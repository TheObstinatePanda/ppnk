const { body, validationResult } = require('express-validator');

// This helper function is to help validate the user input for the Foster Login model.
const userValidationRules = (isUpdate = false) => [
    body('username')
        .if(() => !isUpdate || body('username').exists())
        .notEmpty()
        .withMessage('Username is required'),
    body('password')
        .if(() => !isUpdate || body('password').exists())
        .isLength({ min: 8, max: 16 })
        .withMessage('Password must be between 8 and 16 characters long')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/)
        .withMessage('Password must contain at least one number')
        .matches(/[!@#$%^&*()]/)
        .withMessage('Password must contain at least one special character (!, @, #, $, %, ^, &, *, *, or )'),
    body('email')
        .if(() => !isUpdate || body('email').exists())
        .isEmail()
        .withMessage('Email must be a valid email address')
        .normalizeEmail()
        .custom(async (email) => {
            const existingUser = await FosterLogin.findOne({ where: { email } });
            if (existingUser) {
                throw new Error('Email already in use');
            }
        }),
];

module.exports = userValidationRules;