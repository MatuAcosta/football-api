const mapper = require('automapper-js')

class BaseBusiness { 
    constructor(EntityRepository,EntityToMap){
        this.entityRepository = EntityRepository;
        this.entityToMap = EntityToMap;
    }

    async getAll(){
        try {
            let entities = await this.entityRepository.getAll();
            if(entities.error) throw entities ;
            return entities.map(entity => mapper(this.entityToMap,entity)); 
        } catch (error) {
            return error
        }

    }
    async getOne(id){
        try {
            const entity = await this.entityRepository.getOne(id);
            if(!entity) return false 
            if(entity.error) throw entity 
            if(entity) return mapper(this.entityToMap,entity);
        } catch (error) {
            return error 
        }



    }

    async create(entity){
        try {
            const createdEntity =  await this.entityRepository.create(entity);
            if (createdEntity.error) throw createdEntity
            return createdEntity
        } catch (error) {
            return error
        }

    }
    async update(id,entity){
        try {
            entity.id = id;
            //entity = mapper(this.entityToMap,entity);
            const updatedEntity =  await this.entityRepository.update(id,entity);
            return updatedEntity   
        } catch (error) {
            return error
        }

    }

    async delete(id){
        try {
            const deleted = await this.entityRepository.delete(id);
            return deleted   
        } catch (error) {
            return error
        }
    }
   async getByName(name) { 
        try {
            const entity = await this.entityRepository.getByName(name);
            return entity 
        }catch (error) {
            return error
        }
    }
    
}
module.exports = BaseBusiness