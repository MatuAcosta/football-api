const {Router} = require('express');
module.exports = function({teamsController}) {  
    const router = Router();
    router.get('', teamsController.getTeams.bind(teamsController))
    router.post('',teamsController.createTeam.bind(teamsController))
    return router;
}