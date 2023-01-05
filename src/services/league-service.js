const BaseService = require("./base-service");

class LeagueService extends BaseService{
    constructor({leagueBusiness,countryService}){
        super(leagueBusiness);
        this.leagueBusiness = leagueBusiness;
        this.countryService = countryService;
    }

    async getCountryOfALeagueByName(name){
        countryName = countryName.toUpperCase();
        let country = await this.countryService.getByName(name);
        if(country) return country.id 
        if(!country) return null 
    }


    async create(body){
        try {
            let country = await this.getCountryOfALeagueByName(body.country);
            if (country) body.country_id = country ;
            let createdLeague = await super.create(body);
            return createdLeague 
        } catch (error) {
            return error
        }

    }
}

module.exports = LeagueService