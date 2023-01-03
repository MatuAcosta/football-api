const BaseBusiness = require("./base-business");
const LeagueDomain = require('./domainModels/league');

class LeagueBusiness extends BaseBusiness { 
    constructor({leagueRepository}){
        super(leagueRepository,LeagueDomain);
        this.leagueRepository = leagueRepository;
    }
}

module.exports = LeagueBusiness