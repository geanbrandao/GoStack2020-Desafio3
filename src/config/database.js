// precisa intalar umas dependencias quando o dialect é o postgres
// https://sequelize.org/master/manual/dialect-specific-things.html
module.exports = {
  dialect: 'postgres',
  host: '192.168.99.100',
  username: 'geanbrandao',
  password: 'desafio2password',
  database: 'desafio2',
  port: 5433,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
