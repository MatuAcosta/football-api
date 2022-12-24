const BaseService = require("./base-service");
const moment = require('moment')
class PlayerService extends BaseService{
    constructor({playerBusiness}){
        super(playerBusiness);
        this.playerBusiness = playerBusiness;
    }

    calculateAge(fecha){
       let today = new Date();
       let diferencia = moment([today.getFullYear(),today.getMonth(),today.getDay()]);
       return diferencia.diff(fecha,'years') 
    }

    async  getAll(){
        try {
            let players =  await super.getAll();
            if(players.length === 0 ) return [];
            for (const p of players) {
                let fecha = [p.birth_date.getFullYear(),p.birth_date.getMonth(),p.birth_date.getDay()];
                p.age = this.calculateAge(moment(fecha))
            }
            return players
        } catch (error) {
            console.log(error)
        }

    }
    async create(body){
        body.birth_date = new Date(body.birth_date);
        return await super.create(body);
    }

}
module.exports = PlayerService