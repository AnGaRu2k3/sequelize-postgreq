'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  name: 'Tag', 
  async up (queryInterface, Sequelize) {
    let data = [{
      "id": 1,
      "name": "expensive"
    }, {
      "id": 2,
      "name": "cheap"
    }, {
      "id": 3,
      "name": "medium"
    }, {
      "id": 4,
      "name": "fast"
    }, {
      "id": 5,
      "name": "slow"
    }, {
      "id": 6,
      "name": "black"
    }, {
      "id": 7,
      "name": "white"
    }]
    data.forEach(item => {
      item.createdAt = Sequelize.literal("NOW()")
      item.updatedAt = Sequelize.literal("NOW()")
    })
    await queryInterface.bulkInsert('Tags', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Tags', null, {});
  }
};
