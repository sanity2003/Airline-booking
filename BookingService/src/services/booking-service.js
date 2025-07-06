const axios = require('axios')


const {BookingRepository} = require('../repository/index')

const {FLIGHT_SERVICE_PATH}=require('../config/serverConfig')
const { ServiceError } = require('../utils/errors')


class BookingService {
  constructor(){
    this.bookingRepository=new BookingRepository()
  }
async createBooking(data){
    try{
       const flightId = data.flightId
       let getFlightRequestURL =`${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`

       

       const response =await  axios.get(getFlightRequestURL)

      

       const flightData =response.data.data
        let priceOfFlight = flightData.price
    if(data.noOfSeats>flightData.totalSeats){
        throw new ServiceError('Somthingwent wrong in booking process','Insufficient Seats')

    }
    const totalCost = priceOfFlight*data.noOfSeats
    const bookingPayload ={...data,totalCost}

    

    const booking = await this.bookingRepository.create(bookingPayload)

    


    const updateFlightRequestURL =`${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`
    await axios.patch(updateFlightRequestURL,{totalSeats:flightData.totalSeats - booking.noOfSeats})
    return booking

    
        
    }catch(error){
        if(error.name == 'RepositoryError' ||error.name == 'ValidationError'){
            throw error
        }
        throw new ServiceError()
    }
}

}

module.exports =BookingService