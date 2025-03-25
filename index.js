const express = require('express');
const sequelize = require('./Model/database');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON data
app.use(express.json());

// Routes
const AnimalsController = require('./Controller/animals.js');
// const ApplicantsController = require('./Controller/applicants.js');
// const FosterLoginsController = require('./Controller/fosterLogins.js');
// const FostersController = require('./Controller/fosters.js');
// const RescuesController = require('./Controller/rescues.js');

app.use('./Animals', require('./Routes/Animals'));
// app.use('./Applicants', require('./Routes/Applicants'));
// app.use('./Rescues', require('./Routes/Rescues'));
// app.use('./Fosters', require('./Routes/Fosters'));
// app.use('./FosterLogins', require('./Routes/FosterLogins'));

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