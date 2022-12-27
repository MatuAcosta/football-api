const BaseBusiness = require("./base-business");
const CountryDomain = require('./domainModels/country');

class CountryBusiness extends BaseBusiness { 
    constructor({countryRepository}){
        super(countryRepository,CountryDomain);
        this.countryRepository = countryRepository;
    }
}

module.exports = CountryBusiness