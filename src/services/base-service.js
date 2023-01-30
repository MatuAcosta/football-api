class BaseService {
    constructor(entityBusiness){
        this.entityBusiness = entityBusiness;
    }

    async getAll(){
        try {
            let response = await this.entityBusiness.getAll();
            if(response.error) throw response;
            return response  
        } catch (error) {
            return error
        }

    }
    async getOne(id){
        try {
            const response =  await this.entityBusiness.getOne(id);
            if(!response) return false
            if(response.error) throw response
            return response 
        } catch (error) {
            return error 
        }


    }
    async create(entity){
       try {
            if(entity.name) entity.name = entity.name.toUpperCase();
            const createdEntity =  await this.entityBusiness.create(entity);
            return createdEntity;
       } catch (error) {
            return error
       }

    }
    async update(id,entity){
        try {
            const updatedEntity =  await this.entityBusiness.update(id,entity);
            return updatedEntity;
        } catch (error) {
            return error
        }

    }
    async delete(id){
        try {
            const deleted = await this.entityBusiness.delete(id);
            return deleted  
        } catch (error) {
            return error
        }

    }
    async getByName(name){
        try {
            name = name.toUpperCase();
            const entity = await this.entityBusiness.getByName(name);
            return entity
        } catch (error) {
            return error
        }
    }
}

module.exports = BaseService