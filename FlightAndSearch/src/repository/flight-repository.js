const { Op, Sequelize } = require('sequelize');
const { Flights, Airport, City } = require('../models/index');

class FlightRepository {

    

    async createFlight(data) {
        try {
            const flight = await Flights.create(data);
            return flight;
        } catch (error) {
            console.log('Something went wrong at repository layer');
            throw (error);
        }
    }
    
    async getFlight(flightId) {
        try {
            const flight = await Flights.findByPk(flightId);
            return flight;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw error;
        }
    }

    async getAllFlights(filter) {
        try {
            const filterObject = {};

            //  Implement Case-Insensitive Search ---
            // This logic converts both the database value and your search term
            // to lowercase, so 'delhi' will match 'Delhi'.
            if (filter.from) {
                const fromCity = await City.findOne({
                    where: Sequelize.where(
                        Sequelize.fn('LOWER', Sequelize.col('name')),
                        Sequelize.fn('LOWER', filter.from)
                    )
                });

                // Safety check: If no city is found, return empty results immediately.
                if (!fromCity) {
                    return [];
                }

                const fromAirports = await Airport.findAll({ where: { cityId: fromCity.id } });
                const fromAirportIds = fromAirports.map(airport => airport.id);
                filterObject.departureAirportId = { [Op.in]: fromAirportIds };
            }

            if (filter.to) {
                const toCity = await City.findOne({
                    where: Sequelize.where(
                        Sequelize.fn('LOWER', Sequelize.col('name')),
                        Sequelize.fn('LOWER', filter.to)
                    )
                });
                
                if (!toCity) {
                    return [];
                }

                const toAirports = await Airport.findAll({ where: { cityId: toCity.id } });
                const toAirportIds = toAirports.map(airport => airport.id);
                filterObject.arrivalAirportId = { [Op.in]: toAirportIds };
            }

            
            const flights = await Flights.findAll({
                where: filterObject
            });

            return flights;
        } catch (error) {
            console.error("ERROR in FlightRepository:", error);
            throw error;
        }
    }

    async updateFlights(flightId, data) {
        try {
            await Flights.update(data, {
                where: {
                    id: flightId
                }
            });
            return true;
        } catch (error) {
            console.log('Something went wrong in the repository layer');
            throw error;
        }
    }
}

module.exports = FlightRepository;
