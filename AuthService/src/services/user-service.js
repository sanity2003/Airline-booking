const jwt =require('jsonwebtoken')
const {JWT_KEY,SALT} = require('../config/serverConfig')
const UserRepository = require('../repository/user-repository')
const bcrypt = require('bcrypt')
const AppErrors = require('../utils/error-handler')
const ValidationError = require('../utils/validation-error')
const { Role } = require('../models/index');
class UserService{
    constructor(){
        this.userRepository = new UserRepository()
    }

    
    async create(data){
        // try{

        //     const encryptedPassword = bcrypt.hashSync(data.password, SALT);
        //     const userData = {
        //         email: data.email,
        //         password: encryptedPassword
        //     };

        //     const user  = await this.userRepository.create(userData)
        //     return user
        // }catch(error){
        //     console.log("Service error",error.name)
        //     if(error.name =='SequelizeValidationError'){
        //         throw new ValidationError(error)
        //     }
        //     console.log("Somthing wrong at service layer")
            
        //     throw new AppErrors(
        //         'ServerError',
        //         'Somthing went wrong in service',
        //         'Logical issue found',
        //         500
        //     )
        // }

        try {
            console.log("\n--- [USER SERVICE] START: Create User ---");
            console.log("[1] Data received by service:", data);

            // Let's verify the SALT variable right here
            console.log("[2] Value of SALT from config:", SALT);
            console.log("[3] Type of SALT from config:", typeof SALT);

            if (typeof SALT === 'undefined' || SALT === null) {
                console.error("[!!] CRITICAL ERROR: The SALT value is undefined. Check your .env file and config/serverConfig.js");
                throw { message: "Server configuration error: SALT is not defined." };
            }

            console.log("[4] Attempting to hash password...");
            const encryptedPassword = bcrypt.hashSync(data.password, SALT);
            console.log("[5] Password hashed successfully.");
           
            

            const userData = {
                email: data.email,
                password: encryptedPassword
            };

            console.log("[6] Attempting to call repository to create user...");
            const user = await this.userRepository.create(userData);
            console.log("[7] Repository call successful. User created.");
            console.log("--- [USER SERVICE] END: Create User ---");

            const customerRole = await Role.findOne({ where: { name: 'CUSTOMER' } });
            await user.addRole(customerRole);

            return user;

        } catch (error) {
            console.error("\n--- [USER SERVICE] !! CATCH BLOCK TRIGGERED !! ---");
            console.error("[!!] THE ORIGINAL ERROR OBJECT IS:", error); // THIS IS THE MOST IMPORTANT LOG
            console.error("--- [USER SERVICE] !! END OF ERROR !! ---\n");
            
            if (error.name == 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            
            throw new AppErrors(
                'ServerError',
                'Somthing went wrong in service',
                'Logical issue found',
                500
            );
        }
    }

    

async SignIn(email, plainPassword) {
    try {
        const user = await this.userRepository.getByEmail(email);
        if (!user) {
            throw { error: 'User not found' };
        }

        const passwordMatch = this.checkPassword(plainPassword, user.password);
        if (!passwordMatch) {
            throw { error: 'Incorrect Password' };
        }

        const newJWT = this.createToken({ email: user.email, id: user.id });
        
        
        return { 
            token: newJWT, 
            id: user.id, 
            email: user.email 
        };

    } catch (error) {
        console.log('Something went wrong in the SignIn service');
        throw error;
    }
}
    

async isAuthenticated (token){
    try{
        const response =  this.verifyToken(token)
        if(!response){
            throw {error:'Invalid token'}
        }
        const user =await this.userRepository.getById(response.id)

        if(!user){
            throw {error:'No user with the corresponding id'}
            
        } 
        return user;
    }catch(error){
            console.log('somthing went wrong in signIn')
            throw error
        }
}


     createToken(user){
        try{
            const result = jwt.sign(user,JWT_KEY,{expiresIn:'1h'})
            return result
        }catch(error){
            console.log('Somthing went wrong in token generation')

            throw error;
        }
    }
    verifyToken(token){
        try{
            const response = jwt.verify(token,JWT_KEY)
            return response
        }catch(error){
            console.log('Somthing went wrong in token validation',error)
            throw error
        }
    }

    checkPassword(userInputPlainPassword,encryptedPassword){
        try{
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword)
        }catch(error){
            console.log('Somthing went wrong in Password comparison')
            throw error
        }
    }
   
 isAdmin(userId){
    try{
        return this.userRepository.isAdmin(userId)
    }catch(error){
        console.log('Somthing went wrong in Service layer')
            throw error
    }
}

}
module.exports = UserService