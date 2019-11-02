const Mongoose = require('mongoose');
const Produtor = Mongoose.model('Produtor');
const UtilsHelper = require('../helpers/Utils');

module.exports = {
  async insert(req, res, next) {
    UtilsHelper.defaultRequest(async () => {
      const id = req.params.produtorId;
      const produtor = await Produtor.findById(id);

      produtor.estufas.push({ ...req.body });
      await produtor.save();

      const response = await Produtor.findById(id);
      return res.send(response);
    }, next);
  },

  async list(req, res, next) {
    UtilsHelper.defaultRequest(async () => {
      const response = await Produtor.findById(req.params.produtorId);

      return res.send(response.estufas);
    }, next);
  },

  async find(req, res, next) {
    UtilsHelper.defaultRequest(async () => {
      const { produtorId, estufaId } = req.params;
      const response = await Produtor.findById(produtorId);
      const estufa = response.estufas.find(item => item._id == estufaId);

      return res.send(estufa);
    }, next);
  }
};
