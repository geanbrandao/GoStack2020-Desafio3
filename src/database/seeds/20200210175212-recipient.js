module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'recipients',
      [
        {
          name: 'Gean Brandao',
          email: 'karlosgean@gmail.com',
          street: 'Rua General Neto',
          number: 2323,
          complement: 'apto 1505',
          state: 'SP',
          city: 'São Lourenço',
          cep: '96014-111',
          owner: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
