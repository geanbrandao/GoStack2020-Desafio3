import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authconfig from '../../config/auth';

export default async (req, res, next) => {
  // desestrutura o token
  const authHeader = req.headers.authorization;
  // verifica se o token existe
  if (!authHeader) {
    return res
      .status(401)
      .json({ status: 'nok', message: 'token não informado' });
  }
  // faz a desestrutucao do header, a primeira posição é o bearer
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authconfig.secret);
    // seta o id do user no body
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ status: 'nok', message: 'token inválido' });
  }
};
