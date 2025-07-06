const {FlightRepository,AirplaneRepository} = require('../repository/index')
 
const {compareTime}=require('../utils/helper')
class FlightService{
    constructor(){
        this.airplaneRepository = new AirplaneRepository()
        this.flightRepository  = new FlightRepository()
    }


    async createFlight(data){
        try{
            if(!compareTime(data.arrivalTime,data.departurTime)){
                throw{error:'arrival not less than departtime'}
            }
            const airplane = await this.airplaneRepository.getAirplane(data.airplaneId)
            const flight = await this.flightRepository.createFlight({...data,totalSeats:airplane.capacity})
            return flight
            
        }catch(error){
            console.log("Somthing went wrong in the service layer")
            throw {error}
        }
    }
  
    async getAllFlightData(data){
        try{
            const flights = await this.flightRepository.getAllFlight(data)
            return flights
        }catch(error){
            console.log("Somthing went wrong in the service layer")
            throw {error}
        }
    }
   async getFlight(flightId){
    try{
        const response= await this.flightRepository.getFlight(flightId)
        return response
    }catch(error){
        console.log("Somthing went wrong in the service layer")
            throw {error}
    }
   }

   async UpdateFlight(flightId,data){
        try{
             const flight = await this.flightRepository.updateFlights(flightId,data)
             return flight
        }catch(error){
            console.log("Somthing went wrong in the service layer")
            throw {error}
        }
   }
}

module.exports = FlightService