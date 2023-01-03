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
            console.log(leagues)
            for (const l of leagues) {
                let base64 = l.logo.toString('base64');
                l.logo = base64;            
            }
            leagues = leagues.map(l => mapper(LeagueDTO,l))
            return res.status(200).send({
                message:'Leagues',
                data:leagues
            })
        } catch (error) {
            console.log(error)
        }
    }
    async createLeague(req,res){
        try {
            let body = req.body;
            if (!Object.hasOwn(body,'name') || !req.file) throw {msg: 'Invalid Parameters', code: 400}
            const path = './uploads/'+ req.file.filename
            body.logo = this.readImage(path)
            let  createdLeague = await this.leagueService.create(body);
            if(createdLeague.error) throw {code: 500, msg: createdLeague.detail};
            createdLeague = mapper(LeagueDTO,createdLeague);
            return res.status(201).send({
                message: 'Created League',
                data: createdLeague
            })
        } catch (error) {
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
                message: 'Updated Country',
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