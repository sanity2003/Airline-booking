class CrudService{
    constructor(repository){
        this.repository=repository
    }

    async create(data){
        try{
            const response = await this.repository.create(data)
            return response
        }catch(error){
            console.log('Somthing went wrong at crud service  ')
        }
    }
    async destroy(id){
        try{
            const response = await this.repository.destroy(id)
            return response
        }catch(error){
            console.log('Somthing went wrong at crud service  ')
        }
    }
    async get(id){
        try{
            const response =await this.repository.get(id)
            return response
        }catch(error){
            console.log('Somthing went wrong at crud service  ')
        }
    }
    async getAll(){
        try{
            const response =await this.repository.getAll()
            return response
        }catch(error){
            console.log('Somthing went wrong at crud service  ')
        }
    }
    async update(id,data){
        try{
            const response =await this.repository.update(id,data)
            return response
        }catch(error){
            console.log('Somthing went wrong at crud service  ')
        }
    }
}

module.exports = CrudService