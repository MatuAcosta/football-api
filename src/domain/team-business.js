const BaseBusiness = require("./base-business");
const TeamDomain = require("./domainModels/team");

class TeamBusiness extends BaseBusiness { 
    constructor({teamsRepository}){
        super(teamsRepository,TeamDomain);
        this.teamsRepository = teamsRepository;
    }
}

module.exports = TeamBusiness