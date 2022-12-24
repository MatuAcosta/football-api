const PlayerDTO = require('../dtos/players.dto');
const mapper = require('automapper-js');
class PlayerController {
    constructor({playerService}){
        this.playerService = playerService;
    }

    async getPlayers(req,res){
        try {
            let players = await this.playerService.getAll();
            console.log(players)
            players = players.map(p => mapper(PlayerDTO,p))
            return res.send(players)
        } catch (error) {
            console.log(error)
        }
    }
    async createPlayer(req,res){
        try {
            const body = req.body;
            const createdPlayer = await this.playerService.create(body);
            return res.send(createdPlayer)
        } catch (error) {
            console.log(error)
        }

    }
    updatePlayer(req,res){
        const id = req.id;
        const body = req.body;

        return this.playerService.update(id,body)
    }
    deletePlayer(){
        const id = req.id;
        return this.playerService.delete(id)
    }


}

module.exports = PlayerController