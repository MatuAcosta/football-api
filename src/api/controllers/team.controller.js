const TeamDTO = require('../dtos/teams.dto.js');
const mapper = require('automapper-js');
const fs = require('fs');
class TeamController {
    constructor({teamsService}){
        this.teamsService = teamsService;
    }

    async getTeams(req,res){
        try {
            let teams = await this.teamsService.getAll();
            console.log(teams)
            if(teams.error) throw {code: 500 , msg: teams.detail};
/*             for (const t of teams) {
                let base64 = t.logo.toString('base64');
                t.logo = base64;            
            } */
            teams = teams.map(t => mapper(TeamDTO,t))
            return res.status(200).send({
                message: 'Teams',
                data: teams})
        } catch (error) {
            console.log(error)
            return res.status(error.code).send({
                message: error.msg
            })
        }
    }
    async createTeam(req,res){
        try {
            let body = req.body;
            const path = './uploads/teams/'+ req.file.filename ; 
            body.logo = this.readImage(path)
            const teamCreated = await this.teamsService.create(body);
            if(teamCreated.error) throw {code: 500, msg: teamCreated.detail};
            return res.status(200).send({
                message:'Exito',
                data: mapper(TeamDTO,teamCreated)
            });
        } catch (error) {
            console.log(error)
            return res.status(error.code).send({
                message:error.msg
            })
        }

    }
    async updateTeam(req,res){
        try {
            const id = req.params.id;
            const body = req.body;
            console.log("BODYYY",req.body);
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

    async getOneById(req,res){
        try {
            const id = req.params.id
            let team = await this.teamsService.getOne(id);
            let base64 = team.logo.toString('base64');
            team.logo = base64;
            if(!team) throw {error}
            return res.send({
                message:'One team by id',
                data:mapper(TeamDTO,team)
            })
        } catch (error) {
            return res.send({
                message:'Error',
                data:error
            })
        }
    }


    readImage(path){
        return fs.readFileSync(path);
    }
}

module.exports = TeamController