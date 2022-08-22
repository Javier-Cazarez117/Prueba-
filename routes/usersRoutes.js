const UsersController  = require ('../controllers/UsersController');
const {accessControl} = require('../middlewares/accessControl');

module.exports = (router) => {
    //rutas del recurso users

   
    router.get('/users', accessControl('readAny', 'user'), UsersController.list);
    router.get('/users/:id', accessControl('readAny', 'user'), UsersController.show);
    router.put('/users/:id', accessControl('updateAny', 'user'), UsersController.update);
    router.delete('/users/:id', accessControl('deleteAny', 'user'), UsersController.delete);
    
    return router;
}