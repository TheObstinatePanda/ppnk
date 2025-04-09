const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Animals = sequelize.define('Animals', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    is_dog: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    is_cat: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    breed: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING(6),
        allowNull: false
    },
    size: {
        type: DataTypes.STRING(6),
        allowNull: false
    },
    good_w_kids: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    good_w_animals: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    house_trained: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    adoption_location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_available: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    is_adopted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    images: {
        type: DataTypes.TEXT
        allowNull: false
    }
});

module.exports = Animals;