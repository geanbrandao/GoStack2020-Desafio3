import Sequelize from 'sequelize';

import Admin from '../app/models/AdminUsers';
import Recipients from '../app/models/Recipients';
import Deliveryman from '../app/models/Deliveryman';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [Admin, Recipients, Deliveryman, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
    // se o model.associate existe chama o model.associate passando os modelsR
  }
}

export default new Database();
