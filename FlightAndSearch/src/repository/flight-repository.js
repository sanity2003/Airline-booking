

const{Op} = require('sequelize')
const {Flights} = require('../models/index')

class FlightRepository{
    #createFilter(data){
        let filter = {}
        if(data.arrivalAirportId){
            filter.arrivalAirportId = data.arrivalAirportId
        }
        if(data.departureAirportId){
            filter.departureAirportId = data.departureAirportId
        }
        if(data.minPrice){
            Object.assign(filter,{price:{[Op.gte]:data.minPrice}})
            
        }
        if(data.maxPrice){
            Object.assign(filter,{price:{[Op.lte]:data.maxPrice}})
            
        }
        if(data.minPrice && data.maxPrice){
        Object.assign(filter,
            {[Op.and]:
                [{price:{[Op.lte]: data.maxPrice}},
                {price:{[Op.gte]: data.minPrice}}
            ]
        })
        }
        
        return filter
    }



    async createFlight(data){
    try{
        const flight = await Flights.create(data)
        return flight
    }catch(error){  
        console.log('Somthing went wrong at repository layer')
        throw(error)
    }
}
async getFlight(flightId){  //fetch
        try{
         const flight = await Flights.findByPk(flightId)
         return flight
        }catch(error){
            console.log('Somthing went wrong in the repository layer')
            throw {error}
        }
    }

    async getAllFlight(filter){  //fetch
        

        try{

            const filterObject = this.#createFilter(filter)
         const flight = await Flights.findAll({
            where:filterObject
         })
         return flight
        }catch(error){
            console.log('Somthing went wrong in the repository layer')
            throw error
        }
    }

async updateFlights(flightId,data){
    try{
            await Flights.update(data,{
                where:{
                    id:flightId
                }
            })
            console.log("Updating flight with:", data);
            
            return true
        }catch(error){
            console.log('Somthing went wrong in the repository layer')
            throw {error}
        }
}

}

module.exports =FlightRepository