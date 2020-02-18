import Sequelize, { Model } from 'sequelize';

class Recipients extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.NUMBER,
        complement: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        cep: Sequelize.STRING,
        owner: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

export default Recipients;
