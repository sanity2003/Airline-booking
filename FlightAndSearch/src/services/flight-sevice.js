const { FlightRepository, AirplaneRepository } = require('../repository/index');
const { compareTime } = require('../utils/helper');

class FlightService {
    constructor() {
        this.airplaneRepository = new AirplaneRepository();
        this.flightRepository = new FlightRepository();
    }

    async createFlight(data) {
        try {
            
            if (!compareTime(data.arrivalTime, data.departurTime)) {
                throw { error: 'Arrival time cannot be less than departure time' };
            }
            const airplane = await this.airplaneRepository.getAirplane(data.airplaneId);
            const flight = await this.flightRepository.createFlight({ ...data, totalSeats: airplane.capacity });
            return flight;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error; // Correctly throw the original error
        }
    }

    async getAllFlightData(filter) {
        try {
            
            const flights = await this.flightRepository.getAllFlights(filter);
            return flights;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    async getFlight(flightId) {
        try {
            const response = await this.flightRepository.getFlight(flightId);
            return response;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    async UpdateFlight(flightId, data) {
        try {
            const flight = await this.flightRepository.updateFlights(flightId, data);
            return flight;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }
}

module.exports = FlightService;