import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    const deliverymans = await Deliveryman.findAll();

    return res.json({ deliverymans });
  }

  async store(req, res) {
    const { name, email } = req.body;
    console.log(name, email);
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        status: 'nok',
        message: 'Dados inválidos',
      });
    }

    const deliverymanExist = await Deliveryman.findOne({ where: { email } });
    console.log(deliverymanExist);
    if (deliverymanExist) {
      return res.status(200).json({
        status: 'nok',
        message: 'Email já cadastrado',
      });
    }

    const deliveryman = await Deliveryman.create({
      name,
      email,
    });

    return res.json(deliveryman);
  }

  async destroy(req, res) {
    const { deliveryman_id } = req.params;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    if (!deliveryman) {
      return res.status(400).json({
        status: 'nok',
        message: 'Entregador não existe',
      });
    }

    await deliveryman.destroy();

    return res.json({
      status: 'ok',
      message: 'Entregador removido com sucesso',
    });
  }

  async update(req, res) {
    const id = req.params.deliveryman_id;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({
        status: 'nok',
        message: `Entregador com o id ${id} não existe`,
      });
    }

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        status: 'nok',
        message: 'Dados inválidos',
      });
    }

    const { email } = req.body;
    if (email) {
      const emailExist = await Deliveryman.findOne({ where: { email } });

      if (emailExist) {
        return res.status(400).json({
          status: 'nok',
          message: 'Email já cadastrado',
        });
      }
    }

    const { id: deliveryman_id, name } = await deliveryman.update(req.body);

    return res.json({
      status: 'ok',
      deliveryman: {
        id: deliveryman_id,
        name,
        email,
      },
    });
  }
}

export default new DeliverymanController();
