const SpecialtiesController  = require ('../controllers/SpecialtiesController');
const {accessControl} = require('../middlewares/accessControl');

module.exports = (router) => {
    //rutas del recurso specialties

    router.post('/specialties', accessControl('createAny','specialty'), SpecialtiesController.fileUpload, SpecialtiesController.add);
    router.get('/specialties', accessControl('readAny','specialty'), SpecialtiesController.list);
    router.get('/specialties/:id', accessControl('readAny','specialty'), SpecialtiesController.show);
    router.put('/specialties/:id', accessControl('updateAny','specialty'), SpecialtiesController.update);
    router.delete('/specialties/:id', accessControl('deleteAny','specialty'), SpecialtiesController.delete);
    
    return router;
}