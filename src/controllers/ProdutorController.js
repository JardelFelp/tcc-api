const Mongoose = require('mongoose');
const Produtor = Mongoose.model('Produtor');
const AuthenticationHelper = require('../helpers/Authentication');
const UtilsHelper = require('../helpers/Utils');

module.exports = {
  async index(req, res, next) {
    UtilsHelper.defaultRequest(async () => {
      const { page } = req.query;
      const response = await Produtor.paginate({}, { page, limit: 10 });

      return res.json(response);
    }, next);
  },

  async details(req, res, next) {
    UtilsHelper.defaultRequest(async () => {
      const response = await Produtor.findById(req.params.id);
      return res.json(response);
    }, next);
  },

  async insert(req, res, next) {
    UtilsHelper.defaultRequest(async () => {
      const { senha } = req.body;
      const response = await Produtor.create({
        ...req.body,
        senha: AuthenticationHelper.encryptPassword(senha)
      });
      return res.json(response);
    }, next);
  },

  async update(req, res, next) {
    UtilsHelper.defaultRequest(async () => {
      const response = await Produtor.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );

      return res.json(response);
    }, next);
  },

  async delete(req, res, next) {
    UtilsHelper.defaultRequest(async () => {
      await Produtor.findByIdAndRemove(req.params.id);
      return res.send();
    }, next);
  }
};
