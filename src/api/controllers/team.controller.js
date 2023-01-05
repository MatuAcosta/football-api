const TeamDTO = require('../dtos/teams.dto.js');
const mapper = require('automapper-js');
class TeamController {
    constructor({teamsService}){
        this.teamsService = teamsService;
    }

    async getTeams(req,res){
        try {
            let teams = await this.teamsService.getAll();
            if(teams.error) throw {code: 500 , msg: teams.detail};
            teams = teams.map(t => mapper(TeamDTO,t))
            return res.status(200).send({
                message: 'Teams',
                data: teams})
        } catch (error) {
            return res.status(error.code).send({
                message: error.msg
            })
        }
    }
    async createTeam(req,res){
        try {
            const body = req.body;
            const teamCreated = await this.teamsService.create(body);
            console.log(teamCreated)
            if(teamCreated.error) throw {code: 500, msg: teamCreated.detail};
            return res.status(200).send({
                message:'Exito',
                data: mapper(TeamDTO,teamCreated)
            });
        } catch (error) {
            return res.status(error.code).send({
                message:error.msg
            })
        }

    }
    async updateTeam(req,res){
        try {
            const id = req.params.id;
            const body = req.body;
            const updatedTeam = await this.teamsService.update(id,body);
            return res.status(201).send({
                message: 'Updated team',
                data: updatedTeam
            })
        } catch (error) {
            res.status(400).send({
                message: 'update error',
                data: error
            })            
        }
    }
    async deleteTeam(req,res){
        try {
            const id = req.params.id;
            let deletedTeam = await this.teamsService.delete(id)
            return res.send({
                message: 'Team deleted',
                data: deletedTeam
            }) 
        } catch (error) {
            res.send({
                message: 'delete error',
                data: error
            })
        }


    }


}

module.exports = TeamController