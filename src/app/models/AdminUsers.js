import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class AdminUsers extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    // hooks sao trechos de código que são executados de forma automatica
    // quando determinadas ações acontecem dentro do código.
    // com o beforeSave a funcao vai ser executada antes de salvar qualquer usuario
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default AdminUsers;
