const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const { validateDependentField } = require('./validators');

const Applicants = sequelize.define('Applicants', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    f_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    l_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    applying_for: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_renting: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    landlord_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isValidRenting(value) {
                validateDependentField(
                    this.is_renting,
                    false,
                    value,
                    'Landlord name is not required if you do not rent.'
                );
                validateDependentField(
                    this.is_renting,
                    true,
                    value,
                    'Landlord name is required if you rent.'
                )
            },
        },
    },
    landlord_contact: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    other_pets: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    how_many_pets: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isValidPets(value) {
                validateDependentField(
                    this.other_pets,
                    false,
                    value,
                    'Pet count is not required if you do not have other pets.'
                );
                validateDependentField(
                    this.other_pets,
                    true,
                    value,
                    'Pet count is required if you do not other pets.'
                )
            },
        },
    },
    pet_type: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isValidPets(value) {
                validateDependentField(
                    this.other_pets,
                    false,
                    value,
                    'Pet types is not required if you do not have other pets.'
                );
                validateDependentField(
                    this.other_pets,
                    true,
                    value,
                    'Pet types are required if you have other pets.'
                )
            },
        },
    },
    vet_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isValidPets(value) {
                validateDependentField(
                    this.other_pets,
                    false,
                    value,
                    'Vet info is not required if you do not have other pets.'
                );
                validateDependentField(
                    this.other_pets,
                    true,
                    value,
                    'Vet info is required if you have other pets.'
                )
            },
        },
        
    },
    is_fixed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        validate: {
            isValidPets(value) {
                validateDependentField(
                    this.other_pets,
                    false,
                    value,
                    'Spay/Neuter information is not required if you do not have other pets.'
                );
                validateDependentField(
                    this.other_pets,
                    true,
                    value,
                    'Spay/Neuter information info is required if you have other pets.'
                )
            },
        },
    },
    still_have: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    why_not: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            isValidPets(value) {
                validateDependentField(
                    this.still_have,
                    true,
                    value,
                    'Reason for not having pets is not required if you still have pets.'
                );
                validateDependentField(
                    this.still_have,
                    false,
                    value,
                    'Reason for not having pets is required if you do not have pets.'
                )
            },
        },
    },
    is_roommate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    known_allergies: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    has_children: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    children_ages: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isValidChildrenAges(value) {
                validateDependentField(
                    this.has_children,
                    false,
                    value,
                    'Children ages are required if you have children.'
                );
                validateDependentField(
                    this.has_children,
                    true,
                    value,
                    'Children ages are required if you do not have children.'
                )
            },
        },
    },
    is_gift: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    would_declaw: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    would_surrender: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    surrender_reason: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            isValidSurrenderReason(value) {
                validateDependentField(
                    this.would_surrender,
                    true,
                    value,
                    'Surrender reason is required if you would surrender.'
                );
                validateDependentField(
                    this.would_surrender,
                    false,
                    value,
                    'Surrender reason is not required if you would not surrender.'
                )
            },
        },
    },
});

module.exports = Applicants;