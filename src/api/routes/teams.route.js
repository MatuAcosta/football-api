const {Router} = require('express');
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/teams')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage:storage})
module.exports = function({teamsController,requestMiddleware}) {  
    const router = Router();
    router.get('', teamsController.getTeams.bind(teamsController));
    router.get('/:id', teamsController.getOneById.bind(teamsController));
    router.post('',[upload.single('logo'),requestMiddleware.verifyTeamBody],teamsController.createTeam.bind(teamsController));
    router.put('/:id',[upload.single('logo')],teamsController.updateTeam.bind(teamsController));
    router.delete('/:id',teamsController.deleteTeam.bind(teamsController));
    return router;
}