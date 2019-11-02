const Express = require('express');
const ProdutorController = require('../controllers/ProdutorController');
const EstufaController = require('../controllers/EstufaController');
const routes = Express.Router();

/**
 * Produtor
 */
routes.get('/produtor', ProdutorController.index);
routes.get('/produtor/:id', ProdutorController.details);
routes.post('/produtor', ProdutorController.insert);
routes.put('/produtor/:id', ProdutorController.update);
routes.delete('/produtor/:id', ProdutorController.delete);

/**
 * Estufa
 */
routes.post('/estufa/:produtorId', EstufaController.insert);
routes.get('/estufa/:produtorId', EstufaController.list);
routes.get('/estufa/:produtorId/:estufaId', EstufaController.find);

module.exports = routes;
