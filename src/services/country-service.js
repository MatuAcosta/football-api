const BaseService = require("./base-service");

class CountryService extends BaseService{
    constructor({countryBusiness}){
        super(countryBusiness);
        this.countryBusiness = countryBusiness;
    }
}

module.exports = CountryService