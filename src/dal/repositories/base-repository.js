class BaseRepository {
    constructor(db,entity){
        this.entity = entity;
        this.db = db;
    }
    
    async getAll(){
        let response = await this.db[this.entity].findAll()
        return response
    }

    async create(body){
        return await this.db[this.entity].create(body);
    }

    async update(id,body){
        return await this.db[this.entity].update(body,{
            where:{
                id
            }
        })
    }

    async delete(id){
        return await this.db[this.entity].destroy({
            where:{
                id
            }
        })
    }

    async getOne(id) {
        return await this.db[this.entity].findOne({
            where:{
                id
            }
        })
    }
    async getByName(name){
        return await this.db[this.entity].findOne({
            where:{
                name
            }
        })
    }
}

module.exports = BaseRepository