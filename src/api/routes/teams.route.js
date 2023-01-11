const {Router} = require('express');
const multer  = require('multer')
const {storage} = require('../storage.js');
const upload = multer({
    storage
})
module.exports = function({teamsController,requestMiddleware}) {  
    const router = Router();
    router.get('', teamsController.getTeams.bind(teamsController));
    router.get('/league/:league',teamsController.getTeamsByLeague.bind(teamsController));
    router.get('/:id', teamsController.getOneById.bind(teamsController));
    router.post('',upload.single('logo'),teamsController.createTeam.bind(teamsController));
    router.put('/:id',[upload.single('logo')],teamsController.updateTeam.bind(teamsController));
    router.delete('/:id',teamsController.deleteTeam.bind(teamsController));
    return router;
}


/* 
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        console.log('DEST',file)
        cb(null,'./uploads/teams')
    },
    filename: function(req,file,cb){
        console.log('HOLA',file)
        cb(null,file.originalname)
    }
})

*/
/* const multerGoogleStorage = require('multer-cloud-storage');
const uploadHandler = multer({
    storage: multerGoogleStorage.storageEngine()
}) */