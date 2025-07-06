const express = require('express')
const AirportController =require('../../controllers/airport-controller')
const CityController = require('../../controllers/city-controller')
const FlightController = require('../../controllers/flight-controller')
const {FlightMiddleWares}= require('../../middlewares/index')
const router =express.Router()


router.post('/city',CityController.create)
router.delete('/city/:id',CityController.destroy)
router.get('/city/:id',CityController.get)
router.get('/city',CityController.getAll)
router.patch('/city/:id',CityController.update)

 router.post('/flights',FlightMiddleWares.                          validateCreateFlight,
       FlightController.create
    )
 router.get('/flights',FlightController.getAll)
 router.get('/flights/:id',FlightController.get)
 router.patch('/flights/:id',FlightController.update)
 router.post('/airport',AirportController.create)

module.exports = router