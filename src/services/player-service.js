const BaseService = require("./base-service");
const moment = require('moment')
class PlayerService extends BaseService{
    constructor({playerBusiness, teamsService,countryService}){
        super(playerBusiness);
        this.playerBusiness = playerBusiness;
        this.teamsService = teamsService;
        this.countryService = countryService;
    }

    calculateAge(fecha){
       let today = new Date();
       fecha = moment([fecha.getFullYear(),fecha.getMonth(),fecha.getDay()])
       let diferencia = moment([today.getFullYear(),today.getMonth(),today.getDay()]);
       return diferencia.diff(fecha,'years') 
    }

    //we use this function to get the player's team name and show it to the user
    async getTeamOfAPlayer(team_id){
        if(!team_id) return null 
        let team = await this.teamsService.getOne(team_id);
        return team.name
    }
    //we use this function to get the player's country name and show it to the user
    async getCountryOfAplayer(country_id){
        if(!country_id) return null 
        let country = await this.countryService.getOne(country_id);
        return country.name 
    }

    async getTeamOfAPlayerByName(teamName){
        let team = await this.teamsService.getByName(teamName.toUpperCase());
        if(team) return team
        return null
    }
    async getCountryOfAPlayerByName(countryName){
        let country = await this.countryService.getByName(countryName.toUpperCase());
        if(country) return country
        return null
    }

    //como lo requerido es el la fecha de nacimiento del jugador
    // en este caso debemos calcular la edad de cada uno para poder mostrar al usuario su edad
    async getAll(){
        try {
            let players =  await super.getAll();
            for (const p of players) {
                p.age = this.calculateAge(p.birth_date)
                if(p.team_id) p.team = await this.getTeamOfAPlayer(p.team_id);
                if(p.country_id) p.country = await this.getCountryOfAplayer(p.country_id);
            }
            return players
        } catch (error) {
            return error
        }
    }


    async update(id,body){
        try {
            if(body.team){
                let team = await this.getTeamOfAPlayerByName(body.team);
                if(team) body.team_id = team.id;

            }
            if (body.country){
                let country = await this.getCountryOfAPlayerByName(body.country)
                if(country) body.country_id = country.id;
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
                let [team,country] = await Promise.all([this.getTeamOfAPlayerByName(body.team),this.getCountryOfAPlayerByName(body.country)]);
                if(team) body.team_id = team.id;
                if(country) body.country_id = country.id
            } catch (error) {
                console.log(error)
                return error
            }
            const createdPlayer = await super.create(body);
            if(createdPlayer.error) throw createdPlayer
            return createdPlayer
        } catch (error) {
            return error
        }

    }

    async getOne(id){
        try {
            let p = await super.getOne(id);
            if(!p) return false
            if(p.error) throw p
            if(p.team_id) p.team = await this.getTeamOfAPlayer(p.team_id);
            if(p.country_id) p.country = await this.getCountryOfAplayer(p.country_id);
            p.age = this.calculateAge(p.birth_date)
            return p 
        } catch (error) {
            return error
        }

    }

    async getPlayersByTeam(team){
        try {
            let players = await this.playerBusiness.getPlayersByTeam(team)
            if(players.error) throw players
            let teamName = await this.getTeamOfAPlayer(team)
            for (const p of players) {
                p.age = this.calculateAge(p.birth_date)
                p.team = teamName
                if(p.country_id) p.country = await this.getCountryOfAplayer(p.country_id);
            }
            return players
        } catch (error) {
            return error
        }
    }

}
module.exports = PlayerService