const express = require('express');
const sequelize = require('./Model/database');
const User = require('./Model/User');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON data
app.use(express.json());

// Route to create a user
app.post('/users', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({ username, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Sync the database and start the server
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync(); // syncs model with the database
        app.listen(PORT, () => console.log('Server is running on port ' + PORT));
    } catch (error) {
        console.error('Unable to connect to the database: ', error);
    }
}

startServer();