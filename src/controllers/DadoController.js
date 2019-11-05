const Mongoose = require('mongoose');
const Produtor = Mongoose.model('Produtor');
const UtilsHelper = require('../helpers/Utils');

module.exports = {
  async insert(req, res, next) {
    UtilsHelper.defaultRequest(async () => {
      const { produtorId, estufaId } = req.params;
      const produtor = await Produtor.findById(produtorId);
      const indexEstufa = produtor.estufas.findIndex(
        item => item._id == estufaId
      );

      if (indexEstufa !== -1) {
        if (req.body.length) {
          req.body.forEach(item =>
            produtor.estufas[indexEstufa].dados.push({ ...item })
          );
        } else {
          produtor.estufas[indexEstufa].dados.push({ ...req.body });
        }

        await produtor.save();

        const response = await Produtor.findById(produtorId);
        return res.send(response);
      }

      throw new Error('Estufa não encontrada');
    }, next);
  },

  async list(req, res, next) {
    UtilsHelper.defaultRequest(async () => {
      const { produtorId, estufaId } = req.params;
      const response = await Produtor.findById(produtorId);
      const estufa = response.estufas.find(item => item._id == estufaId);

      return res.send(estufa.dados);
    }, next);
  }
};
