const {Router} = require('express');
module.exports = function({playerController}) {  
    const router = Router();
    router.get('', playerController.getPlayers.bind(playerController))
    router.post('',playerController.createPlayer.bind(playerController))
    router.put('/:id',playerController.updatePlayer.bind(playerController));
    router.delete('/:id',playerController.deletePlayer.bind(playerController));
    router.get('/:id',playerController.getOneById.bind(playerController))
    return router;
}
/* 
.bind(playerController) */