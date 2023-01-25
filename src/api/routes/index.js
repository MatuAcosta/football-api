const express = require('express');
const {Router} = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

module.exports = function({playersRoute,teamsRoute,countryRoute,leagueRoute,searchRoute}) {  
    const router = Router();
    const apiRoute = Router();
    apiRoute
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ 
        extended: true 
     }))
    .use(cors())
    router.get('/',(req,res)=>{
        return res.json({
            message:'Realizando doc en Swagger'
        })
     })
    apiRoute.use('/search',searchRoute);
    apiRoute.use('/players', playersRoute);
    apiRoute.use('/teams',teamsRoute);
    apiRoute.use('/countries',countryRoute)
    apiRoute.use('/leagues',leagueRoute)
    router.use('/', apiRoute);
    return router;
}