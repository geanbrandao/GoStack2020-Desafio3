import Sequelize from 'sequelize';

import Admin from '../app/models/AdminUsers';
import Recipients from '../app/models/Recipients';

import databaseConfig from '../config/database';

const models = [Admin, Recipients];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
