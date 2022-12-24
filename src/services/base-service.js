class BaseService {
    constructor(entityBusiness){
        this.entityBusiness = entityBusiness;
    }
    
    async getAll(){
        let response = await this.entityBusiness.getAll();
        return response
    }
    async getOne(id){
        const entity =  this.entityBusiness.getOne(id);
        return entity;
    }
    async create(entity){
       try {
            const createdEntity =  await this.entityBusiness.create(entity);
            return createdEntity;
       } catch (error) {
            console.log(error)
       }

    }
    async update(id,entity){
        const updatedEntity =  this.entityBusiness.update(id,entity);
        return updatedEntity;
    }
    async delete(id){
        return  this.entityBusiness.delete(id);
    }
    async getByName(name){
        return  this.entityBusiness.getByName(name);
    }
}

module.exports = BaseService