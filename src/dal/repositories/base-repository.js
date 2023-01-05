class BaseRepository {
    constructor(db,entity){
        this.entity = entity;
        this.db = db;
    }
    
    async getAll(){
        try {
            let response = await this.db[this.entity].findAll()
            return response
        } catch (error) {
            console.log(error);
            return {
                error: true,
                detail: error.name
            }
        }

    }

    async create(body){
        try {
            let entity =  await this.db[this.entity].create(body);
            return entity
        } catch (error) {
            return {
                error: true,
                detail: error.name
            }
        }
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
        try {
            let entity =  await this.db[this.entity].findOne({
                where:{
                    id
                }
            })
            return entity
        } catch (error) {
            return {
                error:true,
                detail: error.name
            }
        }



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