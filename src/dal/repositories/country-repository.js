const BaseRepository = require("./base-repository");

class CountryRepository extends BaseRepository{
    constructor({db}){
        super(db,'Country')
        this.db = db;
    }
}

module.exports = CountryRepository