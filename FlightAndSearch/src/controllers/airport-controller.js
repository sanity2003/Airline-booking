const {AirportService }= require('../services/index')
const airportService = new AirportService()

const create =async(req,res)=>{
    try{
        const response = await airportService.create(req.body)
        return res.status(201).json({
            message:'Successfully created the airport',
            err:{},
            data:response,
            success:true
        })
    }catch(error){
        console.log(error)
            return res.status(500).json({
                data:{},
                success:false,
                message:'Somthing went wrong at new airport',
                err:error
            })
    }


    const destroy = (req,res)=>{
        try{

        }catch(error){
        console.log(error)
            return res.status(500).json({
                data:{},
                success:false,
                message:'Somthing went wrong at new airport',
                err:error
            })
    }

    const get = (req,res)=>{
        try{

        }catch(error){
        console.log(error)
            return res.status(500).json({
                data:{},
                success:false,
                message:'Somthing went wrong at new airport',
                err:error
            })
    }

}
}
const getAll = (req,res)=>{
        try{

        }catch(error){
        console.log(error)
            return res.status(500).json({
                data:{},
                success:false,
                message:'Somthing went wrong at new airport',
                err:error
            })
    }

}

const update = (req,res)=>{
        try{

        }catch(error){
        console.log(error)
            return res.status(500).json({
                data:{},
                success:false,
                message:'Somthing went wrong at new airport',
                err:error
            })
    }

}
}

module.exports  ={
    create
}