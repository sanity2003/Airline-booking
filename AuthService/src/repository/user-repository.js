const { ValidationError } = require('sequelize')
const {User,Role} = require('../models/index')


class UserRepository{
    async create(data){
        try{
            
            const user = await User.create(data)
            return user
        }catch(error){
            if(error.name == 'SequelizeValidationError'){
            throw new ValidationError(error)
           
            }
        
            console.log('Somthing went wrong at repository layer')
            throw error
        }
    }
    async destroy(userId){
        try{
             await User.destroy({
                where:{
                    id:userId
                }
            })
            return true
        }catch(error){
            console.log('Somthing went wrong at repository layer')
            throw error
        }
    }
    async getById(userId){
        try{
            const user = await User.findByPk(userId,{
                attributes:['email','id']
            })
            return user
        }catch(error){
            console.log('Somthing went wrong at repository layer')
            throw error
        }
    }
async getByEmail(userEmail){
    try{
        const user = await User.findOne({
            where:{
                email:userEmail
            }
        })
        return user
    }catch(error){
            console.log('Somthing went wrong at repository layer')
            throw error
}

}
async isAdmin(userId){
    try{
        const user = await User.findByPk(userId, {
            include: [{
                model: Role,
                where: { name: 'ADMIN' },
                required: true // This makes it an INNER JOIN
            }]
        });
        return user !== null;
    }catch(error){
        console.log('Somthing went wrong at repository layer',error)
            throw error
    }
}


}

module.exports = UserRepository