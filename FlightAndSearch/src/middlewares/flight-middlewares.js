const{ClientErrorCodes}=require('../utils/error-code')

const validateCreateFlight =(req,res,next)=>{
    if(
        !req.body.flightNumber ||
        !req.body.airplaneId ||
        !req.body.departureAirportId ||
        !req.body.arrivalTime ||
        !req.body.departurTime ||
        !req.body.price

    ){
            // if of body param missing we come inside the if
            return res.status(ClientErrorCodes.BAD_REQUEST).json({
                data:{},
                success:false,
                message:'Invalid request body for created flight',
                err:'Missing mandatory properties to create flight'
            })
        }

        next()
        
}

module.exports ={
    validateCreateFlight
}