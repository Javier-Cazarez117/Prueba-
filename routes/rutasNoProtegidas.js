const express = require('express');
const router = express.Router();


const sesionController  = require ('../controllers/SesionController');
const usersController = require('../controllers/UsersController');
const passwordController = require('../controllers/PasswordController');
const commentariesController = require('../controllers/CommentariesController');

module.exports = function() {
    router.post('/users', usersController.add);
    router.post('/login', sesionController.login);
    router.post('/recuperar-password', passwordController.resetearPassword);
    router.post('/validar-token', passwordController.validarTokenPassword);
    router.post('/actualizar-contrasena', passwordController.guardarNuevoPassword);

    router.post('/commentaries', commentariesController.add);

    
    return router;
}
