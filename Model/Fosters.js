const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Fosters = sequelize.define('Fosters', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    specialization: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adoption_location: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Fosters;