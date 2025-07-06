const {statusCodes, StatusCodes}=require ('http-status-codes')

class ValidationError extends Error {
    constructor(error){
        super()
        let explanation =[]
        error.errors.forEach((err)=>{
            explanation.push(err.message)
        })
        this.name = 'validationError'
        this.message='Not able to validate the data'
        this.explanation=explanation
        this.statusCodes = StatusCodes.BAD_REQUEST
    }
}
module.exports=ValidationError