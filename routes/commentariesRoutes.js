const commentariesController = require('../controllers/CommentariesController');
const {accessControl} = require('../middlewares/accessControl');

module.exports = (router) => {
    router.get('/commentaries', accessControl('readAny', 'commentary'), commentariesController.list);
    router.get('/commentaries/:id', accessControl('readAny', 'commentary'), commentariesController.show);
    router.delete('/commentaries/:id', accessControl('deleteAny', 'commentary'), commentariesController.delete);

    return router;
}