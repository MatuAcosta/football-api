const BaseService = require("./base-service");

class LeagueService extends BaseService{
    constructor({leagueBusiness,countryService}){
        super(leagueBusiness);
        this.leagueBusiness = leagueBusiness;
        this.countryService = countryService;
    }

    async getCountryOfALeagueByName(name){
        name = name.toUpperCase();
        let country = await this.countryService.getByName(name);
        if(country) return country.id 
        if(!country) return null 
    }
    async getCountryOfALeagueById(league_id){
        let country = await this.countryService.getOne(league_id);
        if(country) return country.name
        return null
    }

    async getAll(){
        try {
            let countries =  await super.getAll();
            for (const c of countries) {
                if(c.country_id) c.country = await this.getCountryOfALeagueById(c.country_id);
            }
            return countries
        } catch (error) {
            return error
        }
    }

    async getOne(id){
        try {
            let c = await super.getOne(id);
            if(!c) return false
            if(c.error) throw c
            if(c.country_id) c.country = await this.getCountryOfALeagueById(c.country_id);
            return c 
        } catch (error) {
            return error
        }

    }

    async create(body){
        try {
            if(body.country){
                let country = await this.getCountryOfALeagueByName(body.country);
                if (country) body.country_id = country ;
            }
            let createdLeague = await super.create(body);
            return createdLeague 
        } catch (error) {
            return error
        }

    }
    async update(id,body){
        try {
            if(body.country){
                let country = await this.getCountryOfALeagueByName(body.country);
                if (country) body.country_id = country ;
            }
            if(body.name) body.name = body.name.toUpperCase();
            let createdLeague = await super.update(id,body);
            return createdLeague 
        } catch (error) {
            return error
        }

    }
}

module.exports = LeagueService