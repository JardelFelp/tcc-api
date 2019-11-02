const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Inicializa leitura do .env

const DADOS_CRIPTOGRAFAR = {
  algoritmo: 'aes256',
  segredo: 'chaves',
  tipo: 'hex'
};

exports.encryptPassword = password => {
  // Cria criptografia com dados selecionados
  const cipher = crypto.createCipher(
    DADOS_CRIPTOGRAFAR.algoritmo,
    DADOS_CRIPTOGRAFAR.segredo
  );
  // Aplica criptografia na senha
  cipher.update(password);

  // Converte para HEX e retorna
  return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
};

exports.verifyJWT = (req, res, next) => {
  // Pega token do header e remove prefixo Bearer
  const { authorization } = req.headers;
  const token = authorization.replace(/Bearer /, '');

  // Caso não tenha token retorna erro 401
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }

  // Inicia verificação do token
  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    // Caso possua algum erro retorna falha na autenticação
    if (error) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' });
    }

    // Se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
};
