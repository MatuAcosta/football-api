const {Router} = require('express');
module.exports = function({countryController}) {  
    const router = Router();
    router.get('', countryController.getCountries.bind(countryController))
    router.post('',countryController.createCountry.bind(countryController))
    router.put('/:id',countryController.updateCountry.bind(countryController));
    router.delete('/:id',countryController.deleteCountry.bind(countryController));
    router.get('/:id',countryController.getOneById.bind(countryController))
    return router;
}