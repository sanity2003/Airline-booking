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
async getAllBookings(userId) {
        try {
            // 1. Get all the raw bookings from the database
            const bookings = await this.bookingRepository.getAll(userId);

            // 2. Create a list of promises to fetch flight details for each booking
            const flightRequestPromises = bookings.map(booking => 
                axios.get(`${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`)
            );
            
            // 3. Wait for all flight details to come back
            const flightResponses = await Promise.all(flightRequestPromises);
            
            // 4. Extract the actual flight data from each response
            const flightData = flightResponses.map(response => response.data.data);

            // 5. Combine the booking and flight data into the perfect object
            const enrichedBookings = bookings.map((booking, index) => {
                return {
                    ...booking.toJSON(), // Convert Sequelize object to plain JSON
                    flight: flightData[index] // Attach the flight details
                };
            });

            return enrichedBookings;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }
}

module.exports =BookingService