# GoStack2020-Desafio2

### Dependências
  * >yarn add express

  * antes de intalar o sequelize precisa criar a estrutura de pastas com models e controllers que para que o sequelize posso funcionar
  * >yarn add sequelize

  * É preciso instalar essas dependencias para suportar o dialeto postgress
  * >yarn add pg pg-hstore

  * Dependência para criptografar a senha
  * >yarn add bcryptjs

  * Dependência para autenticação
  * >yarn add jsonwebtoken

  * Dependência para validação dos campos
  * >yarn add yup

#

### Dependências de desenvolvimento
  * >yarn add nodemon -D

  * Essa dependência serve para mudar o padrão dos import e export
  * >yarn add sucrase -D

  * >yarn add eslint -D
    * >yarn eslint --init
      * selecionado essas opções
      * To ckeck syantax, find problems, and enforce code style
      * JavaScript modules
      * Node of these
      * No
      * Node
      * Use a popular guider
      * Airbnb: https://github.com/airbnb/javascript
      * JavaScript
    * Um arquivo `package-lock.json` é gerado. Ele deve ser excluido, pois o eslint intala as depencencias usando npm. Por fim rode 'yarn' para que seja feito o mapeamento das novas dependências.
    * Obs.: Instalar o eslint no vscode
    * Adicionar ao arquivo `settings.json` do vscode.
      ````
        "[javascript]": {
          "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true
          }
        },
        "[javascriptreact]": {
          "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true
          }
        },
        ````
    * É necessário adicionar algumas regras ao arquivo `.eslintrc.js`
      ````
      rules: {
      "prettier/prettier": "error",
      "class-methods-use-this": "off",
      "no-param-reassign": "off",
      "camelcase": "off",
      "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
      },

      ````

  * prettier é responsavel por deixar o código mais bonito
  * >yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
    * adicionar o prettier dentro do 'extends' no arquivo `.eslintrc.js`. E adicionar logo abaixo o array plugins com prettier dentro.
    * O prettier entra em conflito em algumas regras com a styleguide do airbnb. Para resolver isso precisa criar um arquivo chamado `.prettierrc` com o seguinte:
      ````
      {
        "singleQuote": "true",
        "trailingComma": "es5"
      }
      ````

  * Obs.: Caso o eslint tenha sido instalado após o projeto já ter vários arquivos criados. Para que não seja necessário entrar e salvar cada um para o eslint formatar, o seguinte comando pode ser executado:
  'yarn eslint --fix src --ext .js'
  onde src corresponde a pasta e .js a extensão do arquivo.

* >yarn sequelize-cli -D
  * é uma interface de linha de comando que vai ajudar a fazer migrations e outras ações pelo terminal.
  * Após ter o sequelice intalado deve-se criar o `.sequelizerc`. Esse arquivo vai servir para exportar os caminhos da pasta config, models e database.


#

### Para executar o código
  * Definir isso no arquivo `package.json`
    ````
    ...
    "scripts": {
      "dev": "nodemon src/server.js",
      "dev:debug": "nodemon --inspect src/server.js"
    },
    ...
    ````

  * >yarn dev - para executar
  * >yarn dev:debug - para debugar


### Docker
  * Para criar a database
  * >docker run --name desafio2 -e POSTGRES_PASSWORD=desafio2password -e POSTGRES_USER=geanbrandao -p 5433:5432 -d postgres

  * Para listar os containers ativos
  * >docker ps
  * Para listar todos os containers
  * >docker ps -a
  * Para excluir um container, o último parametro é o id do container.
  * >docker container rm eea6c65fe23f
  * Para parar um container
  * >docker stop desafio2
  * Para iniciar um container
  * >docker start desafio2
  * Para visualizar possíveis problemas que tenham acontecido durante o processo.
  * >docker logs desafio2

### Criação das tabelas

  * Criar uma migration que vai criar a tebela de admin
  * > yarn sequelize migration:create --name=create-admin_users

  * Depois é necessario preencheer o arquivo gerado

  * Para rodar a primeira migration
  * >yarn sequelize db:migrate

  * Para desfazer a última migration
  * >yarn sequelize db:migrate:undo

  * Para desfazer todas as migrations
  * >yarn sequelize db:migrate:undo:all

  * Para criar registros na base de dados de forma automatizada
  * >yarn sequelize seed:generate --name admin-user

  * Para inserir os dados fake criados
  * >yarn sequelize db:seed:all

# PARA O [DESAFIO 3](https://github.com/Rocketseat/bootcamp-gostack-desafio-03/blob/master/README.md#desafio-03-continuando-aplica%C3%A7%C3%A3o)
  * Criar a tabela deliveryman
  * > yarn sequelize migration:create --name=create-deliveryman
  * > yarn sequelize db:migrate

  * Criar a tabela files que vai guardar arquivos da aplicação, como fotos de perfil
  * > yarn sequelize migration:create --name=create-files
  * > yarn sequelize db:migrate
  * Criar uma pasta temporária para armazenar os files
  * Criar um campo na tabela deliveryman que referencia o registro na tabela file
  * > yarn sequelize migration:create --name=add-avatar-field-to-deliveryman
  * > yarn sequelize db:migrate

  * Adicionar dependência para tratamento de exceções
  * > yarn add @sentry/node@5.12.2
  * Como as funções são assíncronas o express não consegue pegar os erros e mandar para o sentry
  * Para resolver isso
  * > yarn add express-async-errors
  * Faz a tratativa do erros para dar uma vizualização melhor para o desenvolvedor
  * > yarn add youch

