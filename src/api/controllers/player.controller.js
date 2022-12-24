const PlayerDTO = require('../dtos/players.dto');
const mapper = require('automapper-js');
class PlayerController {
    constructor({playerService}){
        this.playerService = playerService;
    }


    //el mapper nos ayuda a cuando obtenemos de las capas superiores el player
    //solamente mostrar la data que queremos al usuario.
    async getPlayers(req,res){
        try {
            let players = await this.playerService.getAll();
            console.log(players)
            players = players.map(p => mapper(PlayerDTO,p))
            return res.status(200).send({
                message:'Players',
                data:players
            })
        } catch (error) {
            console.log(error)
        }
    }
    async createPlayer(req,res){
        try {
            const body = req.body;
            const createdPlayer = await this.playerService.create(body);
            return res.status(201).send({
                message: 'Player created',
                data: createdPlayer
            })
        } catch (error) {
            console.log(error)
        }

    }
    async updatePlayer(req,res){
        try {
            const id = req.params.id;
            const body = req.body;
            const updatedPlayer = await this.playerService.update(id,body);
            return res.status(201).send({
                message: 'Updated Player',
                data: updatedPlayer
            })
        } catch (error) {
            res.status(400).send({
                message: 'update error',
                data: error
            })            
        }
    }
    async deletePlayer(req,res){
        try {
            const id = req.params.id;
            let deletedPlayer = await this.playerService.delete(id)
            return res.send({
                message: 'Player deleted',
                data: deletedPlayer
            }) 
        } catch (error) {
            res.send({
                message: 'delete error',
                data: error
            })
        }
    }

    async getOneById(req,res){
        try {
            const id = req.params.id
            let player = await this.playerService.getOne(id);
            console.log(player)
            if(!player) throw {error}
            return res.send({
                message:'One player by id',
                data:player
            })
        } catch (error) {
            return res.send({
                message:'Error',
                data:error
            })
        }
    }


}

module.exports = PlayerController