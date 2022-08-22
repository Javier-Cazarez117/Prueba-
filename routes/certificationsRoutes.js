const certificationsController = require('../controllers/CertificationsController');
const {accessControl} = require('../middlewares/accessControl');

module.exports = (router) => {
    router.post('/certifications', accessControl('createAny','certification'),certificationsController.fileUpload, certificationsController.add);
    router.get('/certifications', accessControl('readAny','certification'), certificationsController.list);
    router.get('/certifications/:id', accessControl('readAny', 'certification'), certificationsController.show);
    router.put('/certifications/:id', accessControl('updateAny', 'certification'), certificationsController.update);
    router.delete('/certifications/:id',accessControl('deleteAny', 'certification'), certificationsController.delete);

    return router;
}