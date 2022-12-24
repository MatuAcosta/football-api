const BaseRepository = require("./base-repository");

class TeamRepository extends BaseRepository { 
    constructor({db}){
        super(db,'Team')
    }
}

module.exports = TeamRepository