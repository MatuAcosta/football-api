class RequestMiddleware {
    constructor(){}

    verifyTeamBody(req,res,next){
        let body = req.body ; 
        if(!body.name){
            return res.status(400).send({
                message: 'Invalid Parameters, name not received'
            })
        }
        next();
    }

    /**
     * required for each player {name, birth_date, position}
     * Example: {
                    "name":"Neymar Jr",
                    "birth_date":"1992-02-05",
                    "position":"DEL"
                } 
     */
    verifyPlayerBody(req,res,next){
        let body = req.body ; 
        if (!body.name || !body.birth_date || !body.position){
            return res.status(400).send({
                message: 'Invalid Parameters'
            })
        }
        next();
    }

    verifyLeagueBody(req,res,next){
        let body = req.body;
        if(!body.name || !req.file){
            return res.status(400).send({
                message: 'Invalid Parameters'
            })
        }
        next();
    }


}

module.exports = RequestMiddleware ;