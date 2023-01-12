const BaseBusiness = require("./base-business");
const PlayerDomain = require('./domainModels/player');

class PlayerBusiness extends BaseBusiness { 
    constructor({playerRepository}){
        super(playerRepository,PlayerDomain);
        this.playerRepository = playerRepository;
    }
   async getPlayersByTeam(team){
    try {
        let entity = await this.playerRepository.getPlayersByTeam(team);
        if(entity.error) throw entity
        return entity
    } catch (error) {
        return error
    }
   }
}

module.exports = PlayerBusiness