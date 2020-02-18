// aqui só ficam as definições das chamadas da api
// seria o meu repository
// só pode ter create, read, update, delete
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import Admin from '../models/AdminUsers';

// login
class SessionController {
  async store(req, res) {
    console.log(req.query);
    console.log(req.body);
    const { email, password } = req.body;
    console.log(email, password);
    // cria o objeto responsavel por validar o body
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });
    // console.log(schema);
    // verifica se não é valido
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        status: 'nok',
        message: 'Campos inválidos',
      });
    }

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      console.log('usuario nao encontrado na database');
      return res.status(400).json({
        status: 'nok',
        message: 'Email inválido',
      });
    }

    if (!(await admin.checkPassword(password))) {
      return res
        .status(401)
        .json({ status: 'nok', message: 'Senha incorreta.' });
    }

    const { id } = admin;

    return res.status(200).json({
      status: 'ok',
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
