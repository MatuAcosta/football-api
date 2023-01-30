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
            if(teams.error) throw {code: 500 , msg: teams.detail};
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

    async getTeamsByLeague(req,res){
        try {
            let league = req.params.league
            if(!league) throw {code:400, message: 'Invalid parameters'}
            let teams = await this.teamsService.getTeamsByLeague(league);
            if(teams.error) throw {error: 500 , msg: teams.detail}
            teams = teams.map(p => mapper(TeamDTO,p))
            return res.status(200).send({
                message:`Teams`,
                data:teams
            })
        } catch (error) {
            console.log(error)
            return res.status(error.code).send({
                message: error.msg
            })
        }
    }




    async createTeam(req,res){
        try {
            console.log(req.file);
            let body = req.body;
            body.logo = req.file.path;
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
            if(req.file){
                body.logo = req.file.path;
            }
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
            const id = req.params.id ;
            let team = await this.teamsService.getOne(id);
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


    async getTeamsByLeague(req,res){
        try {
            const league = req.params.league;
            console.log(league)
            let teams = await this.teamsService.getTeamsByLeague(league);
            console.log('TEAMS',teams)
            if(teams.error) throw {code: 500 , msg: teams.detail};
            teams = teams.map(t => mapper(TeamDTO,t))
            return res.status(200).send({
                message: 'Teams',
                data: teams})
        } catch (error) {
            console.log(error)
            return res.status(error.code).send({
                message: 'Error',
                data: error
            })
        }
    }

    readImage(path){
        return fs.readFileSync(path);
    }
}

module.exports = TeamController