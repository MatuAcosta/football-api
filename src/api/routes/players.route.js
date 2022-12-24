const {Router} = require('express');
module.exports = function({playerController}) {  
    const router = Router();
    router.get('', playerController.getPlayers.bind(playerController))
    router.post('',playerController.createPlayer.bind(playerController))
    return router;
}
/* 
.bind(playerController) */