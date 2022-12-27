const CountryDTO = require('../dtos/country.dto');
const mapper = require('automapper-js');
class CountryController {
    constructor({countryService}){
        this.countryService = countryService;
    }


    //el mapper nos ayuda a cuando obtenemos de las capas superiores el country
    //solamente mostrar la data que queremos al usuario.
    async getCountries(req,res){
        try {
            let countries = await this.countryService.getAll();
            console.log(countries)
            countries = countries.map(p => mapper(CountryDTO,p))
            return res.status(200).send({
                message:'Countries',
                data:countries
            })
        } catch (error) {
            console.log(error)
        }
    }
    async createCountry(req,res){
        try {
            const body = req.body;
            const createdCountry = await this.countryService.create(body);
            return res.status(201).send({
                message: 'Country created',
                data: createdCountry
            })
        } catch (error) {
            console.log(error)
        }

    }
    async updateCountry(req,res){
        try {
            const id = req.params.id;
            const body = req.body;
            const updatedCountry = await this.countryService.update(id,body);
            return res.status(201).send({
                message: 'Updated Country',
                data: updatedCountry
            })
        } catch (error) {
            res.status(400).send({
                message: 'update error',
                data: error
            })            
        }
    }
    async deleteCountry(req,res){
        try {
            const id = req.params.id;
            let deletedCountry = await this.countryService.delete(id)
            return res.send({
                message: 'Country deleted',
                data: deletedCountry
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
            let player = await this.countryService.getOne(id);
            console.log(country)
            if(!country) throw {error}
            return res.send({
                message:'One country by id',
                data:country
            })
        } catch (error) {
            return res.send({
                message:'Error',
                data:error
            })
        }
    }


}

module.exports = CountryController