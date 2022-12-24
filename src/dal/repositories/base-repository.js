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

}

module.exports = BaseRepository