'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  name: 'User', 
  async up (queryInterface, Sequelize) {
    let data = [{
      "id": 1,
      "username": "fsmithson0",
      "password": "xY0@1ww0tkaJszO",
      "firstName": "Franchot",
      "lastName": "Smithson",
      "imagePath": "#",
      "isAdmin": true
    }, {
      "id": 2,
      "username": "tfalls1",
      "password": "gB7\"rJYfZ'@Uu1d",
      "firstName": "Tripp",
      "lastName": "Falls",
      "imagePath": "#",
      "isAdmin": false
    }, {
      "id": 3,
      "username": "bllelweln2",
      "password": "gR4&VfBed5!",
      "firstName": "Birgit",
      "lastName": "LLelweln",
      "imagePath": "#",
      "isAdmin": false
    }, {
      "id": 4,
      "username": "athomazin3",
      "password": "kX8.fm*}re/1",
      "firstName": "Averyl",
      "lastName": "Thomazin",
      "imagePath": "#",
      "isAdmin": true
    }]
    data.forEach(item => {
      item.createdAt = Sequelize.literal("NOW()")
      item.updatedAt = Sequelize.literal("NOW()")
    })
    await queryInterface.bulkInsert("Users", data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {})
  }
};
