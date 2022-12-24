const BaseRepository = require("./base-repository");

class PlayerRepository extends BaseRepository{
    //recibir db por ioc
    constructor({db}){
        super(db,'Player');
        this.db = db;
    }


}

module.exports = PlayerRepository