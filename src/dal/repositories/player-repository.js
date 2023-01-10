const BaseRepository = require("./base-repository");

class PlayerRepository extends BaseRepository{
    //recibir db por ioc
    constructor({db}){
        super(db,'Player');
        this.db = db;
    }

    async getPlayersByTeam(team_id){
        try {
            let players = await this.db['Player'].findAll({
                where:{
                    team_id
                }
            })
            return players
        } catch (error) {
            return {
                error: true,
                detail: error.name
            }
        }
    }

}

module.exports = PlayerRepository