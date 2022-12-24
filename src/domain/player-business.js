const BaseBusiness = require("./base-business");
const PlayerDomain = require('./domainModels/player');

class PlayerBusiness extends BaseBusiness { 
    constructor({playerRepository}){
        super(playerRepository,PlayerDomain);
        this.playerRepository = playerRepository;
    }
}

module.exports = PlayerBusiness