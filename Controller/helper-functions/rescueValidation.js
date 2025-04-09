const { body, validationResult } = require('express-validator');   

const rescueValidationRules = (isUpdate = false ) => [
    body('name')
        .if(() => !isUpdate || body('name').exists())
        .notEmpty()
        .withMessage('Name is required'),
    body('address')
        .if(() => !isUpdate || body('address').exists())
        .notEmpty()
        .withMessage('Address is required'),
    body('email')
        .if(() => !isUpdate || body('email').exists())
        .isEmail()
        .withMessage('Email must be a valid email address')
        .normalizeEmail()
        .custom(async (email) => {
            const existingRescue = await Rescues.findOne({ where: { email } });
            if (existingRescue) {
                throw new Error('Email already in use');
            }
        }),
    body('phone')
        .if(() => !isUpdate || body('phone').exists())
        .notEmpty()
        .withMessage('Phone number is required'),
    body('specialization')
        .if(() => !isUpdate || body('specialization').exists())
        .notEmpty()
        .withMessage('Specialization is required'),
]

module.exports = rescueValidationRules;