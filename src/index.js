const Express = require('express');
const Mongoose = require('mongoose');
const RequireDir = require('require-dir');
const Cors = require('cors');
require('dotenv').config();

const app = Express();

app.use(Express.json());
app.use(Cors());

Mongoose.connect('mongodb://localhost:27017/ControleEstufa', {
  useNewUrlParser: true
});

RequireDir('./models');

app.use('/api', require('./routes/routes.js'));
app.listen(8081);
