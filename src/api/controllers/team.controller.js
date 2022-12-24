const TeamDTO = require('../dtos/teams.dto.js');
const mapper = require('automapper-js');
class TeamController {
    constructor({teamsService}){
        this.teamsService = teamsService;
    }

    async getTeams(req,res){
        try {
            let teams = await this.teamsService.getAll();
            teams = teams.map(t => mapper(TeamDTO,t))
            return res.send(teams)
        } catch (error) {
            console.log(error)
        }
    }
    async createTeam(req,res){
        const body = req.body;
        const teamCreated = await this.teamsService.create(body)
        return res.status(200).send({
            message:'Exito',
            data: mapper(TeamDTO,teamCreated)
        });
    }
    updateTeam(req,res){
        const id = req.id;
        const body = req.body;

        return this.teamsService.update(id,body)
    }
    deleteTeam(){
        const id = req.id;
        return this.teamsService.delete(id)
    }


}

module.exports = TeamController