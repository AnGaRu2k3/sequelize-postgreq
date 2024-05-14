'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  name: 'Category', 
  async up (queryInterface, Sequelize) {
    let data = [{
      "id": 1,
      "name": "Chevrolet"
    }, {
      "id": 2,
      "name": "Mercedes-Benz"
    }, {
      "id": 3,
      "name": "Nissan"
    }, {
      "id": 4,
      "name": "Land Rover"
    }, {
      "id": 5,
      "name": "Nissan"
    }, {
      "id": 6,
      "name": "Audi"
    }]
    data.forEach(item => {
      item.createdAt = Sequelize.literal('NOW()')
      item.updatedAt = Sequelize.literal('NOW()')
    })
    await queryInterface.bulkInsert("Categories", data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null, {})
  }
};
