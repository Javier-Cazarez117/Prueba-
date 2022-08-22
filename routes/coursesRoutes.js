const CoursesController = require ('../controllers/CoursesController');
const {accessControl} = require('../middlewares/accessControl');

module.exports = (router) => {
    router.post('/courses', accessControl('createAny', 'course'), CoursesController.fileUpload, CoursesController.add);
    router.get('/courses', accessControl('readAny', 'course'), CoursesController.list);
    router.get('/courses/:id', accessControl('readAny', 'course'), CoursesController.show);
    router.put('/courses/:id',accessControl('updateAny', 'course'), CoursesController.update);
    router.delete('/courses/:id',accessControl('deleteAny', 'course'), CoursesController.delete);

    return router;
}