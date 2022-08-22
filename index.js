require ('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const passport = require('passport');
const models = require('./models');
const routes = require('./routes');
const rutasNoProtegidas = require('./routes/rutasNoProtegidas');
require('./middlewares/auth');

models.sequelize.authenticate()
.then(()=> console.log("BD conectada"))
.catch((error)=> console.error(error));

const app = express();
app.set('port',process.env.APP_PORT);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.enable('trust proxy');

app.use('/', rutasNoProtegidas());

app.use('/', passport.authenticate('jwt', {session: false}), routes());

app.use(express.static('uploads'));

app.listen(process.env.PORT || 5000);

app.listen(app.get('port'), () => {
    console.log(`up and running on port  ${app.get('port')}`);
});