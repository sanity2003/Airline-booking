const jwt =require('jsonwebtoken')
const {JWT_KEY} = require('../config/serverConfig')
const UserRepository = require('../repository/user-repository')
const bcrypt = require('bcrypt')
const AppErrors = require('../utils/error-handler')
const ValidationError = require('../utils/validation-error')

class UserService{
    constructor(){
        this.userRepository = new UserRepository()
    }

    async create(data){
        try{
            const user  = await this.userRepository.create(data)
            return user
        }catch(error){
            console.log("Service error",error.name)
            if(error.name =='SequelizeValidationError'){
                throw new ValidationError(error)
            }
            console.log("Somthing wrong at service layer")
            
            throw new AppErrors(
                'ServerError',
                'Somthing went wrong in service',
                'Logical issue found',
                500
            )
        }
    }

    async SignIn(email,plainPassword){
        try{
            // fetch the user using the email

            const user = await this.userRepository.getByEmail(email)

            // compare plainPassword with store Envrypted password
            const passwordMatch = this.checkPassword(plainPassword,user.password)

            if(!passwordMatch){
                console.log('Password does not match')
                throw {error:'Incorrect Password'}
            }
            // if password match then creat a token  
            const newJWT =this.createToken({email:user.email,id:user.id})
            return newJWT


        }catch(error){
            console.log('somthing went wrong in signIn')
            throw error
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
        return user.id
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

            return error
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