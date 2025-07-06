const express = require('express')
const bodyParser = require('body-parser')

const {PORT} =require('./config/serverConfig')

const ApiRoutes = require('./routes/index')

const CityRepository = require('./repository/city-repository')

const db = require('./models/index')

//  const {Airplane} = require('./models/index')

const setupAndStartServer =async()=>{
         const app= express()
         app.use(bodyParser.json())
          app.use(bodyParser.urlencoded({extended:true}))

         app.use('/api',ApiRoutes)
        
         app.listen(PORT,async()=>{
            console.log(`Server Started at ${PORT}`)

               if(process.env.SYNC_DB){
                  db.sequelize.sync({alter:true})
               }

/// below create of neew airport having id and in city which having id

         //   // db.sequelize.sync({alter:true})
         //   const city = await City.findOne({
         //    where:{
         //       id:4
         //    }
         //   })
         //   const airports = await city.getAirports()
         //    // const newAirport = await Airport.findOne({
         //    //     where:{
         //    //       id:5
         //    //     }
         //    // })
         //    // await city.addAirport(newAirport)
         //    // await city.addAirport({
         //    //    name:'Jindal Vijaynagar Airport'
         //    // })
            //  console.log(city,airports)

             // below creating of new airplanes
         // await Airplane.create({
         //    modelNumber:'Bombardier CRJ'
         // })

         })


        

}

setupAndStartServer()