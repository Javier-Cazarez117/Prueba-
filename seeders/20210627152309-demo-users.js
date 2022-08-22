'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Users', [{
      name: 'Juan Carlos',
      lastName: 'García Sánchez',
      email: 'juangs123@gmail.com',
      password: '1234',
      createdAt: new Date(),
      updatedAt: new Date()

    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
