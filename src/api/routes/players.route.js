const {Router} = require('express');
module.exports = function({playerController,requestMiddleware}) {  
    const router = Router();
    router.get('', playerController.getPlayers.bind(playerController));
    router.get('/:team',playerController.getPlayersByTeam.bind(playerController));
    router.post('',[requestMiddleware.verifyPlayerBody],playerController.createPlayer.bind(playerController))
    router.put('/:id',playerController.updatePlayer.bind(playerController));
    router.delete('/:id',playerController.deletePlayer.bind(playerController));
    router.get('/:id',playerController.getOneById.bind(playerController))
    return router;
}
/* 
.bind(playerController) */