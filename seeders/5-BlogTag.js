'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  name: 'BlogTag', 
  async up (queryInterface, Sequelize) {
    let data = [{
      "blogId": 3,
      "tagId": 5
    }, {
      "blogId": 6,
      "tagId": 3
    }, {
      "blogId": 2,
      "tagId": 7
    }, {
      "blogId": 3,
      "tagId": 4
    }, {
      "blogId": 4,
      "tagId": 1
    }, {
      "blogId": 5,
      "tagId": 6
    }, {
      "blogId": 5,
      "tagId": 7
    }, {
      "blogId": 5,
      "tagId": 5
    }, {
      "blogId": 2,
      "tagId": 3
    }, {
      "blogId": 2,
      "tagId": 1
    }, {
      "blogId": 6,
      "tagId": 5
    }, {
      "blogId": 6,
      "tagId": 4
    }, {
      "blogId": 5,
      "tagId": 1
    }, {
      "blogId": 4,
      "tagId": 3
    }, {
      "blogId": 2,
      "tagId": 6
    }, {
      "blogId": 6,
      "tagId": 1
    }, {
      "blogId": 1,
      "tagId": 6
    }]
    data.forEach(item => {
      item.createdAt = Sequelize.literal("NOW()")
      item.updatedAt = Sequelize.literal("NOW()")
    })
    await queryInterface.bulkInsert("BlogTag", data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("BlogTag", null, {})
  }
};
