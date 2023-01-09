const express = require('express');
const {Router} = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

module.exports = function({playersRoute,teamsRoute,countryRoute,leagueRoute}) {  
    const router = Router();
    const apiRoute = Router();
    apiRoute
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ 
        extended: true 
     }))
    .use(cors())
    //apiRoute.use('/search',searchRoute);
    apiRoute.use('/players', playersRoute);
    apiRoute.use('/teams',teamsRoute);
    apiRoute.use('/countries',countryRoute)
    apiRoute.use('/leagues',leagueRoute)
    router.use('/',apiRoute);
    return router;
}