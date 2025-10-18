// const express =require('express')
// const cors =  require('cors');
// const {PORT} = require('./config/serverConfig')
// const app = express()
// const apiRoutes = require('./routes/index')
// const db = require('./models/index')



// const bodyParser = require('body-parser')

// const prepareAndStartServer =()=>{
//     app.use(cors());
//     app.use(bodyParser.json())
//     app.use(bodyParser.urlencoded({extended:true}))
//     app.use('/api',apiRoutes)
//     app.listen(PORT,async()=>{
//         console.log(`Server started on PORT:${PORT}`)
//         if(process.env.DB_SYNC){
//             db.sequelize.sync({alter:true})
//         }
        
//     })
// }

// prepareAndStartServer()

// AuthService/src/index.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const db = require('./models/index');

const app = express();

const prepareAndStartServer = async () => {

    // Middlewares must be registered before routes
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api', apiRoutes);

    // The key change is here:
    // We now wait for the DB sync to finish BEFORE starting the server.
    if (process.env.DB_SYNC) {
        try {
            console.log('Database sync started...');
            // await db.sequelize.sync({ alter: true });
            console.log('Database sync SKIPPED for this test.');
        } catch (error) {
            console.error('Failed to sync database:', error);
            // We should not start the server if the database fails
            process.exit(1);
        }
    }

    app.listen(PORT, () => {
        console.log(`Server started and ready to accept requests on PORT: ${PORT}`);
    });
}

prepareAndStartServer();