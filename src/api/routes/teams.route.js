const {Router} = require('express');
module.exports = function({teamsController,requestMiddleware}) {  
    const router = Router();
    router.get('', teamsController.getTeams.bind(teamsController));
    router.post('',[requestMiddleware.verifyNameBody],teamsController.createTeam.bind(teamsController));
    router.put('/:id',teamsController.updateTeam.bind(teamsController));
    router.delete('/:id',teamsController.deleteTeam.bind(teamsController));
    return router;
}