
const UserService = require('../services/user-service');
const userService = new UserService();

const create = async (req, res) => {
    try {
        console.log(`[Controller] Attempting to call userService.create with email: ${req.body.email}`);
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new user',
            data: response,
            err: {}
        });
    } catch (error) {
       
        console.error("\n--- [CONTROLLER] CATCH BLOCK TRIGGERED ---");
        console.error("[!!] THE ORIGINAL, DETAILED ERROR RECEIVED FROM THE SERVICE LAYER IS:");
        console.error(error); 
        console.error("--- [CONTROLLER] END OF ERROR ---\n");
        
        return res.status(error.statusCode || 500).json({
            message: error.message || 'Something went wrong in the controller',
            data: {},
            success: false,
            err: error.explanation || error
        });
    }
}

const signIn = async(req,res)=>{
    try{
        const response =await userService.SignIn(req.body.email,req.body.password)
        return res.status(200).json({
            success:true,
            data:response,
            err:{},
            message:'Successfully SignIn'
        })
    }catch(error){
        console.log('error in signin controller',error)
        return res.status(error.statusCode||500).json({
            message:'Somthing went wrong',
            data:{},
            success:false,
            err:error.explanation||'An internal error occurred'

        })
    }
}
const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data: response,
            success: true,
            err: {},
            message: 'User is authenticated and token is valid'
        });
    } catch (error) {
        
        if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
            
            return res.status(401).json({
                message: 'Token is invalid or has expired',
                success: false,
                data: {},
                err: error.message
            });
        }

        
        console.error("UNEXPECTED ERROR in isAuthenticated:", error); 
        return res.status(500).json({
            message: 'Something went wrong on the server',
            data: {},
            success: false,
            err: 'An internal error occurred'
        });
    }
};
const isAdmin =async(req,res)=>{
    try{
        const response = await userService.isAdmin(req.body.id)
        return res.status(200).json({
            data:response,
            err:{},
            success:true,
            message:'Successfully fetch whether user is admin or not  '
        })
    }catch(error){
        return res.status(error.statusCode||500).json({
            message:'Somthing went wrong',
            data:{},
            success:false,
            err:error.explanation||'An internal error occurred'

        })
    }
}


module.exports ={
    create,
    signIn,
    isAuthenticated,
    isAdmin
}