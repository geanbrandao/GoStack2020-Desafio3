import * as Yup from 'yup';

import Recipient from '../models/Recipients';
import Admin from '../models/AdminUsers';

class AdminController {
  async store(req, res) {
    // desestruturar dados
    console.log(req.userId);
    // validar os dados
    const data = {
      name: req.body.name,
      email: req.body.email,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      state: req.body.state,
      city: req.body.city,
      cep: req.body.cep,
      owner: req.userId,
    };

    console.log(data);

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string().required(),
    });

    if (!(await schema.isValid(data))) {
      return res.status(400).json({
        status: 'nok',
        message: 'Campos inválidos',
      });
    }

    // verifica se destinatario ja existe na database
    const recipientExist = await Recipient.findOne({
      where: { email: data.email },
    });

    if (recipientExist) {
      return res
        .status(400)
        .json({ status: 'nok', message: 'Destinatário já existe' });
    }

    const recipient = await Recipient.create(data);

    const owner = await Admin.findOne({ where: { id: req.userId } });

    return res.status(200).json({
      status: 'ok',
      message: 'Destinatário criado',
      recipient: {
        id: recipient.id,
        name: recipient.name,
        email: recipient.email,
        street: recipient.street,
        number: recipient.number,
        complement: recipient.complement,
        state: recipient.state,
        city: recipient.city,
        cep: recipient.cep,
        owner: {
          id: owner.id,
          name: owner.name,
          email: owner.email,
        },
      },
    });
  }

  async update(req, res) {
    const { id } = req.query;
    console.log(id, req.body);

    const schema = Yup.object().shape({
      email: Yup.string().email(),
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      cep: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ status: 'nok', message: 'Campos inválidos' });
    }

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({
        status: 'nok',
        message: `Destinatário com id: ${id} não existe`,
      });
    }

    if (recipient.owner !== req.userId) {
      return res.status(401).json({
        status: 'nok',
        message: 'Você não tem autorização para editar este ',
      });
    }

    const { email } = req.body;

    if (email && email !== recipient.email) {
      // procura se já existe algum destinatario cadastrado com esse email
      const recipientExist = await Recipient.findOne({ where: { email } });
      if (recipientExist) {
        return res
          .status(400)
          .json({ status: 'nok', message: 'Email já cadastado' });
      }
    }

    const recipientUpdated = await recipient.update(req.body, {
      include: [
        {
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.status(200).json({
      status: 'ok',
      recipient: {
        id: recipientUpdated.id,
        name: recipientUpdated.name,
        email: recipientUpdated.email,
        street: recipientUpdated.street,
        number: recipientUpdated.number,
        complement: recipientUpdated.complement,
        state: recipientUpdated.state,
        city: recipientUpdated.city,
        cep: recipientUpdated.cep,
      },
    });
  }

  // lista todos os destinatarios do admin
  async index(req, res) {
    const id = req.userId;

    const data = await Recipient.findAll({ where: { owner: id } });

    return res.status(200).json({ status: 'ok', data });
  }

  async destroy(req, res) {
    const { id } = req.query;

    // procura o destinatario
    const recipient = await Recipient.findByPk(id);

    // verifica se existe e retorna uma resposta
    if (!recipient) {
      return res.status(400).json({
        status: 'nok',
        message: `Destinatário com id: ${id} não existe`,
      });
    }

    // verifica se o admin é o dono do destinatario
    if (recipient.owner !== req.userId) {
      return res.status(401).json({
        status: 'nok',
        message: 'Você não tem autorização para remover este destinatário',
      });
    }
    // se tudo estiver certo, exclui
    await recipient.destroy();

    return res.status(200).json({
      status: 'ok',
      message: 'Destinatário removido com sucesso',
    });
  }
}

export default new AdminController();
