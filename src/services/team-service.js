const BaseService = require("./base-service");

class TeamService extends BaseService{
    constructor({teamsBusiness,countryService}){
        super(teamsBusiness);
        this.teamsBusiness = teamsBusiness;
        this.countryService = countryService
    }

    async getCountryOfATeamByName(countryName){
        let country = await this.countryService.getByName(countryName);
        return country.id 
    }
    async getCountryOfATeamById(country_id){
        let country = await this.countryService.getOne(country_id);
        console.log(country)
        return country.name 
    }

    async getAll(){
        try {
            let teams = await super.getAll();
            for (const t of teams){
                if(t.country_id) t.country = await this.getCountryOfATeamById(t.country_id);
            }
            return teams   
        } catch (error) {
            return error
        }

    }
    async getOne(id){
        try {
            let team = await super.getOne(id);
            if(team.country_id ) team.country = await this.getCountryOfATeamById(team.country_id)
            return team
        } catch (error) {
            return error
        }
    }


    async create(body){
        try {
            let countryTeam = await this.getCountryOfATeamByName(body.country); 
            if(countryTeam) body.country_id = countryTeam;
            let createdTeam = await super.create(body);
            return createdTeam
        } catch (error) {
            return error
        }
    }

    async update(id,body){
        try {
            if(body.country){
                let country = await this.getCountryOfATeamByName(body.country);
                if (country) body.country_id = country;
            }
            let updatedTeam = await super.update(id,body);
            return updatedTeam
        } catch (error) {
            return error
        }
    }

}

module.exports = TeamService