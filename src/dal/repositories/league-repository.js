const BaseRepository = require("./base-repository");

class LeagueRepository extends BaseRepository{
    constructor({db}){
        super(db,'League')
        this.db = db;
    }
/*     async create(body){
        return await this.db[this.entity].create(body);
    } */
}

module.exports = LeagueRepository