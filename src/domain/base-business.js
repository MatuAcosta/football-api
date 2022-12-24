const mapper = require('automapper-js')

class BaseBusiness { 
    constructor(EntityRepository,EntityToMap){
        this.entityRepository = EntityRepository;
        this.entityToMap = EntityToMap;
    }

    async getAll(){
        let entities = await this.entityRepository.getAll();
        return entities.map(entity => mapper(this.entityToMap,entity));
    }
    async getOne(id){
        const entity =  this.entityRepository.getOne(id);
        return mapper(this.entityToMap,entity);
    }

    async create(entity){
        const createdEntity =  await this.entityRepository.create(entity);
        return createdEntity
    }
    async update(id,entity){
        entity.id = id;
        //entity = mapper(this.entityToMap,entity);
        const updatedEntity =  this.entityRepository.update(id,entity);
        return updatedEntity
    }

    async delete(id){
        return  this.entityRepository.delete(id);
    }

   async getByName(name) { 
        return  this.entityRepository.getByName(name);
    }
    
}
module.exports = BaseBusiness