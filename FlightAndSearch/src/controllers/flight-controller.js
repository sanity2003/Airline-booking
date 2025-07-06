const {FlightService} = require('../services/index')
const {SuccessCodes}= require('../utils/error-code')

const flightService = new FlightService()

const create = async (req,res)=>{
    try{
     const flightRequestData= {
        flightNumber:  req.  body.flightNumber, 
      airplaneId:  req.body.airplaneId ,
       departureAirportId: req.body.departureAirportId ,
       arrivalAirportId:req.body.arrivalAirportId ,
       arrivalTime: req.body.arrivalTime ,
        departurTime:req.body.departurTime ,
        price:req.body.price
    }

      const flight = await flightService.createFlight(flightRequestData)
      return res.status(SuccessCodes.CREATED).json({
                data: flight,
                success:true,
                message: 'successfully created a flight',
                err:{}

            })
    }catch(error){
        console.log(error)
            return res.status(500).json({
                data:{},
                success:false,
                message:'Not able to create a city',
                err:error
    })
}
}

const getAll=async(req,res)=>{
        try{
            const response= await flightService.getAllFlightData(req.query)
            return res.status(SuccessCodes.OK).json({
                data: response,
                success:true,
                message: 'successfully fetched a flight',
                err:{}
            })
        }catch(error){
            return res.status(500).json({
                data:{},
                success:false,
                message:'Not able to fetch the flight',
                err:error
            })
        }
    }
        const get = async (req,res)=>{
            try{
            const response= await flightService.getFlight(req.params.id)
            return res.status(SuccessCodes.OK).json({
                data: response,
                success:true,
                message: 'successfully fetched the flight',
                err:{}
            })
        }catch(error){
            return res.status(500).json({
                data:{},
                success:false,
                message:'Not able to fetch the flight',
                err:error
            })
        }

        
}
const update = async (req,res)=>{
            try{
                console.log("Update request received for flight", req.params.id);
                console.log("Request body:", req.body)


            const response= await flightService.UpdateFlight(req.params.id,req.body)
            return res.status(SuccessCodes.OK).json({
                data: response,
                success:true,
                message: 'successfully updated the flight',
                err:{}
            })
        }catch(error){

            console.log("Error in update controller:", error);
            return res.status(500).json({
                data:{},
                success:false,
                message:'Not able to updated the flight',
                err:error
            })
        }
}

module.exports = {
    create,
    getAll,
    get,
    update
}