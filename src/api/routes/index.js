const express = require('express');
const {Router} = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

module.exports = function({playersRoute,teamsRoute}) {  
    const router = Router();
    const apiRoute = Router();
    apiRoute
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ 
        extended: true 
     }))
    .use(cors())
    apiRoute.use('/players', playersRoute);
    apiRoute.use('/teams',teamsRoute);
    router.use('/',apiRoute);
    return router;
}