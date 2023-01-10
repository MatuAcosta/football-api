class SearchController {
    constructor({leagueService,teamsService,playerService,countryService}){

    }
    
    getQuery(req,res){
        return res.json({
            message: req.query
        })
    }

}

module.exports = SearchController;