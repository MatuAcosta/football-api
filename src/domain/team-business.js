const BaseBusiness = require("./base-business");
const TeamDomain = require("./domainModels/team");

class TeamBusiness extends BaseBusiness { 
    constructor({teamsRepository}){
        super(teamsRepository,TeamDomain);
        this.teamsRepository = teamsRepository;
    }
    
    async getTeamsByLeague(league){
        try {
            let teams = await this.teamsRepository.getTeamsByLeague(league);
            if(teams.error) throw teams
            return teams
        } catch (error) {
            return error
        }
    }
}

module.exports = TeamBusiness