class BaseService {
    constructor(entityBusiness){
        this.entityBusiness = entityBusiness;
    }
    
    async getAll(){
        try {
            let response = await this.entityBusiness.getAll();
            return response  
        } catch (error) {
            return error
        }

    }
    async getOne(id){
        const entity =  await this.entityBusiness.getOne(id);
        return entity;
    }
    async create(entity){
       try {
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
            const entity = await this.entityBusiness.getByName(name);
            return entity
        } catch (error) {
            return error
        }
    }
}

module.exports = BaseService