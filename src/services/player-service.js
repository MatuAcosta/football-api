const BaseService = require("./base-service");
const moment = require('moment')
class PlayerService extends BaseService{
    constructor({playerBusiness, teamsService}){
        super(playerBusiness);
        this.playerBusiness = playerBusiness;
        this.teamsService = teamsService
    }

    calculateAge(fecha){
       let today = new Date();
       fecha = moment([fecha.getFullYear(),fecha.getMonth(),fecha.getDay()])
       let diferencia = moment([today.getFullYear(),today.getMonth(),today.getDay()]);
       return diferencia.diff(fecha,'years') 
    }

    //we use this function to get the player's name team and show it to the user
    async getTeamOfAPlayer(team_id){
        let team = await this.teamsService.getOne(team_id);
        return team.name
    }
    
    //como lo requerido es el la fecha de nacimiento del jugador
    // en este caso debemos calcular la edad de cada uno para poder mostrar al usuario su edad
    async getAll(){
        try {
            let players =  await super.getAll();
            for (const p of players) {
                p.age = this.calculateAge(p.birth_date)
                if(p.team_id) p.team = await this.getTeamOfAPlayer(p.team_id)
            }
            return players
        } catch (error) {
            return error
        }
    }


    async update(id,body){
        try {
            if(body.team){
                let team = await this.teamsService.getByName(body.team);
                if(team) body.team_id = team.id;
            }
            let updated = await super.update(id,body);
            return updated
        } catch (error) {
            return error
        }
    }

    async create(body){
        try {
            body.birth_date = new Date(body.birth_date);
            try {
                let team = await this.teamsService.getByName(body.team);
                if(team) body.team_id = team.id
            } catch (error) {
                console.log(error)
                return error
            }
            const createdPlayer = await super.create(body);
            if(!createdPlayer) throw {msg:'error'}
            return createdPlayer
        } catch (error) {
            return error
        }

    }

    async getOne(id){
        try {
            let p = await super.getOne(id);
            if(!p) throw {error:'Player not found'}
            if(p.team_id) p.team = await this.getTeamOfAPlayer(p.team_id)
            p.age = this.calculateAge(p.birth_date)
            return p 
        } catch (error) {
            return error
        }

    }

}
module.exports = PlayerService