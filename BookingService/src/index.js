const express =require('express')
const  bodyParser = require('body-parser')
const {PORT}=require('./config/serverConfig')
const app =express()
const db = require('./models/index')
const apiRoutes = require('./routes/index')

const setupAndStartServer =()=>{
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))

    // app.get('/api/v1/home',(req,res)=>{
    //     return res.json({message:'Hitting the booking service'})
    // })

    app.use('/api',apiRoutes)


    app.listen(PORT,()=>{
        console.log('server started at PORT:',PORT)

        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true})
        }
        
    })
}

setupAndStartServer()