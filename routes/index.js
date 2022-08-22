const express = require('express');

const router = express.Router();

const usersRoutes =  require('./usersRoutes');
const specialtiesRoutes = require('./specialtiesRoutes');
const coursesRoutes = require('./coursesRoutes');
const commentariesRoutes = require('./commentariesRoutes');
const certificationsRoutes = require('./certificationsRoutes');

module.exports = () => {
    usersRoutes(router);
    specialtiesRoutes(router);
    coursesRoutes(router);
    commentariesRoutes(router);
    certificationsRoutes(router);

    return router;
}