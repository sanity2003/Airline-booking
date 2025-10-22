const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');

const { PORT } = require('../config/serverConfig');
const TicketController = require('../controllers/ticket-controller');
const jobs = require('../utils/job');
const _db = require('../models/index'); 

const setupAndStartServer = async () => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    
    app.post('/api/v1/tickets', TicketController.create);

    

    app.listen(PORT, () => {
        console.log(`ReminderService started at port ${PORT}`);
       
        jobs(); 
    });
}

setupAndStartServer();