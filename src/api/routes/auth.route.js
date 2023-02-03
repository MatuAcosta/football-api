const {Router} = require('express');
module.exports = function({authController}) {  
    const router = Router();
    router.post('/login',authController.signIn.bind(authController))
    router.post('/register',authController.signUp.bind(authController))
    return router;
}