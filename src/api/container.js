const {asClass, createContainer, asFunction, asValue } = require('awilix');
const StartUp = require('./startup');
const Server = require('./server');
const Routes = require('./routes');
const db = require('../dal/models/index');

const playersRoute = require('./routes/players.route');
const playerController = require('./controllers/player.controller');
const PlayerService = require('../services/player-service');
const PlayerBusiness = require('../domain/player-business');
const PlayerRepository = require('../dal/repositories/player-repository');

const teamsRoute = require ('./routes/teams.route');
const TeamController = require('./controllers/team.controller');
const TeamService = require('../services/team-service');
const TeamBusiness = require('../domain/team-business');
const TeamRepository = require('../dal/repositories/team-repository');


const container = createContainer();

container.register({
    app: asClass(StartUp).singleton(),
    server: asClass(Server).singleton(),
    router: asFunction(Routes).singleton(),
    db: asValue(db)
})

container.register({
    playersRoute: asFunction(playersRoute).singleton(),
    playerController: asClass(playerController).singleton(),
    playerService: asClass(PlayerService).singleton(),
    playerBusiness: asClass(PlayerBusiness).singleton(),
    playerRepository: asClass(PlayerRepository).singleton()
})


container.register({
    teamsRoute: asFunction(teamsRoute).singleton(),
    teamsController: asClass(TeamController).singleton(),
    teamsService: asClass(TeamService).singleton(),
    teamsBusiness: asClass(TeamBusiness).singleton(),
    teamsRepository: asClass(TeamRepository).singleton()
})

module.exports = container;