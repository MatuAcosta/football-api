const {Router} = require('express');
module.exports = function({searchController}) {  
    const router = Router();
    router.get('', searchController.getQuery.bind(searchController))
/*     router.post('',[requestMiddleware.verifyPlayerBody],searchController.createPlayer.bind(searchController))
    router.put('/:id',searchController.updatePlayer.bind(searchController));
    router.delete('/:id',searchController.deletePlayer.bind(searchController));
    router.get('/:id',searchController.getOneById.bind(searchController)) */
    return router;
}