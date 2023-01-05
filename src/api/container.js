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

const countryRoute = require('./routes/country.route')
const CountryController = require('./controllers/country.controller');
const CountryService = require('../services/country-service');
const CountryBusiness = require('../domain/country-business');
const CountryRepository = require('../dal/repositories/country-repository');
const leagueRoute = require('./routes/league.route');
const LeagueController = require('./controllers/league.controller');
const LeagueService = require('../services/league-service');
const LeagueBusiness = require('../domain/league-business');
const LeagueRepository = require('../dal/repositories/league-repository');


const RequestMiddleware = require('./middleware/requestMiddleware');

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

container.register({
    countryRoute: asFunction(countryRoute).singleton(),
    countryController: asClass(CountryController).singleton(),
    countryService: asClass(CountryService).singleton(),
    countryBusiness: asClass(CountryBusiness).singleton(),
    countryRepository: asClass(CountryRepository).singleton()
})

container.register({
    leagueRoute: asFunction(leagueRoute).singleton(),
    leagueController: asClass(LeagueController).singleton(),
    leagueService: asClass(LeagueService).singleton(),
    leagueBusiness: asClass(LeagueBusiness).singleton(),
    leagueRepository: asClass(LeagueRepository).singleton()
})

container.register({
    requestMiddleware: asClass(RequestMiddleware).singleton()
})

module.exports = container;