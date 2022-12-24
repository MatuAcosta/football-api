const BaseService = require("./base-service");

class TeamService extends BaseService{
    constructor({teamsBusiness}){
        super(teamsBusiness);
        this.teamsBusiness = teamsBusiness;
    }
}

module.exports = TeamService