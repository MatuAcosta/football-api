const {Router} = require('express');
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage:storage})
module.exports = function({leagueController, requestMiddleware}) {  
    const router = Router();
    router.get('', leagueController.getLeagues.bind(leagueController))
    router.post('',[upload.single('logo'),requestMiddleware.verifyLeagueBody],leagueController.createLeague.bind(leagueController))
    router.put('/:id',[upload.single('logo')],leagueController.updateLeague.bind(leagueController));
    router.delete('/:id',leagueController.deleteLeague.bind(leagueController));
    router.get('/:id',leagueController.getOneById.bind(leagueController))
    return router;
}