const BaseRepository = require("./base-repository");

class TeamRepository extends BaseRepository { 
    constructor({db}){
        super(db,'Team')
    }

    async getTeamsByLeague(league_id){
        try {
            let teams = await this.db['Team'].findAll({
                where: {
                    league_id
                }
            })
            return teams
        } catch (error) {
            return {
                error: true,
                detail: error.name
            }
        }
    }

}

module.exports = TeamRepository