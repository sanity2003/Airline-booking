const {StatusCodes}=require('http-status-codes')

const {BookingService }=require('../services/index')

const bookingService =new BookingService()

const create =async (req,res)=>{
    try{

        

        const response = await bookingService.createBooking(req.body)
        console.log("From Booking Controller",response)
        return res.status(StatusCodes.OK).json({
            message:'successfully created booking',
            success:true,
            data:response,
            err:{}
        })
    }catch(error){
        console.log("From BookingController ",error)
        return res.status(error.statusCodes).json({
            message:error.message,
            success:false,
            data:{},
            err:error.explanation
        })
    }
}
    const getAll = async (req, res) => {
    try {
        const response = await bookingService.getAllBookings(); // Assuming you have this service function
        return res.status(StatusCodes.OK).json({
            message: 'Successfully fetched all bookings',
            success: true,
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Failed to fetch bookings',
            success: false,
            data: {},
            err: error
        });
    }
}


module.exports={
    create,
    getAll
}