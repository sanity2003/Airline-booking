const {StatusCodes} = require('http-status-codes')

class AppErrors extends Error{
    constructor(
        name='AppError',
        message = 'Somthing went wrong',
        explanation='Somthing went wrong',
        statusCode=StatusCodes.INTERNAL_SERVER_ERROR
    ){
        super(message)
        
        this.explanation=explanation ,
        this.name=name,
        this.statusCode=statusCode
    }
}

module.exports= AppErrors
    
