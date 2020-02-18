import express from 'express';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(express.json());
    this.server.use(routes);
  }
}

export default new App().server;
// depois de mudar para import as coisas se tentar rodar com o node nao funciona
// então precisa rodar com sucrase
// $ yarn sucrase-node src/server.js
