const {StatusCodes} = require('http-status-codes')

const {Booking} = require('../models/index')
const { AppError,ValidationError } = require('../utils/errors')



class BookingRepository{
    async create(data){
        try{
            const booking =await Booking.create(data)
            return booking
        }catch(error){
            if(error.name == 'SequelizeValidationError'){
                throw new ValidationError(error)
            }
            throw new AppError(
                'RepositoryError',
                'Cannot create booking',
                'There was some  error in booking please try again',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
    async update(bookingId,data){
        try{
            await Booking.update(data,{
                where:{
                    id:bookingId
                }
            })
            return true
        }catch(error){
            throw new AppError(
                'RepositoryError',
                'Cannot update booking',
                'There was some  issue updating  in booking please try again',
                StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    async getAll(userId) {
        try {
            // This query finds all bookings. You can add a 'where' clause later
            // to find bookings for a specific user.
            const bookings = await Booking.findAll();
            return bookings;
        } catch (error) {
            console.log('Something went wrong at repository layer');
            throw error;
        }
    }
}

module.exports=BookingRepository