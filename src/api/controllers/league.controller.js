const mapper = require('automapper-js');
const fs = require('fs');
const LeagueDTO = require('../dtos/league.dto');

class LeagueController {
    constructor({leagueService}){
        this.leagueService = leagueService;
    }

    //el mapper nos ayuda a cuando obtenemos de las capas superiores de la league 
    //solamente mostrar la data que queremos al usuario.
    async getLeagues(req,res){
        try {
            let leagues = await this.leagueService.getAll();
            if(leagues.error) throw {code: 500 , msg: leagues.detail};
            console.log(leagues)
            for (const l of leagues) {
                let base64 = l.logo.toString('base64');
                l.logo = 'data:image/jpeg;base64,' + base64;            
            }
            leagues = leagues.map(l => mapper(LeagueDTO,l))
            return res.status(200).send({
                message:'Leagues',
                data:leagues
            })
        } catch (error) {
            console.log(error)
            return res.status(error.code).send({
                message: error.msg
            })
        }
    }
    async createLeague(req,res){
        try {
            let body = req.body;
            const path = './uploads/'+ req.file.filename
            body.logo = this.readImage(path)
            let  createdLeague = await this.leagueService.create(body);
            console.log(createdLeague)
            if(createdLeague.error) throw {code: 500, msg: createdLeague.detail};
            createdLeague = mapper(LeagueDTO,createdLeague);
            return res.status(201).send({
                message: 'Created League',
                data: mapper(LeagueDTO,createdLeague)
            })
        } catch (error) {
            console.log(error);
            return res.status(error.code).send({
                message: error.msg
            });

        }

    }
    async updateLeague(req,res){
        try {
            const id = req.params.id;
            const body = req.body;
            if(req.file){
                const path = '/uploads/'+req.file.filename ; 
                body.logo = this.readImage(path)
            }
            const updatedLeague = await this.leagueService.update(id,body);
            return res.status(201).send({
                message: 'Updated League',
                data: updatedLeague
            })
        } catch (error) {
            res.status(400).send({
                message: 'update error',
                data: error
            })            
        }
    }
    async deleteLeague(req,res){
        try {
            const id = req.params.id;
            let deletedLeague = await this.leagueService.delete(id)
            return res.send({
                message: 'Country deleted',
                data: deletedLeague
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
            let league = await this.leagueService.getOne(id);
            let base64 = league.logo.toString('base64');
            league.logo = base64;
            if(!league) throw {error}
            return res.send({
                message:'One league by id',
                data:league
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

module.exports = LeagueController