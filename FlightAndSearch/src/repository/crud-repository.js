class CrudRepository{
    constructor(model){
        this.model =model
    }
    async create(data){
        try{
            const result = await this.model.create(data)
            return result
           }catch(error){
            console.log('Something went wrong at crud layer')
           }
    
    }
    async destroy(modelID){
        try{
            const result = await this.model.destroy({
                where:{
                    id:modelID
                }
            })
           return result
        }catch(error){
         console.log('Something went wrong at crud layer')
        }
    }
    async get(modelID){
        try{
            const result = await this.model.findByPk(modelID)
            return result
        }catch(error){
            console.log('Something went wrong at crud layer')
        }
    }
    async getAll(){
        try{
            const result = await this.model.findAll()
            return result
        }catch(error){
            console.log('Something went wrong at crud layer')
        }
    }
    async update(modelId,data){
        try{
            const result =await this.model.update(data,{
                where:{
                    id:modelId
                }
            })
            return result
        }catch(error){
            console.log('Something went wrong at crud layer')
        }
    }





}

module.exports = CrudRepository