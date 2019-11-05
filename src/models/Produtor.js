const Mongoose = require('mongoose');
const MongoosePaginate = require('mongoose-paginate');

const ProdutoresSchema = new Mongoose.Schema({
  nome_produtor: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    minlength: 10
  },
  senha: {
    type: String,
    required: true
  },
  estufas: [
    {
      identificador: {
        type: String,
        required: true,
        unique: true
      },
      dados: [
        {
          temperatura_ambiente: Number,
          umidade_ambiente: Number,
          temperatura_solo: Number,
          umidade_solo: Number,
          exposicao_solar: Number,
          dataHoraColeta: { type: Date, default: Date.now },
          createdAt: { type: Date, default: Date.now }
        }
      ],
      createdAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

ProdutoresSchema.plugin(MongoosePaginate);
Mongoose.model('Produtor', ProdutoresSchema);
