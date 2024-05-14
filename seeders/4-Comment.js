'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  name: 'Comment', 
  async up (queryInterface, Sequelize) {
    let data = [{
      "id": 1,
      "message": "turpis adipiscing lorem",
      "blogId": 1,
      "userId": 1
    }, {
      "id": 2,
      "message": "proin eu mi nulla ac enim in tempor turpis",
      "blogId": 2,
      "userId": 3
    }, {
      "id": 3,
      "message": "platea dictumst aliquam augue",
      "blogId": 4,
      "userId": 3
    }, {
      "id": 4,
      "message": "varius nulla facilisi cras non velit nec",
      "blogId": 1,
      "userId": 4
    }, {
      "id": 5,
      "message": "congue diam id ornare imperdiet sapien urna pretium",
      "blogId": 4,
      "userId": 1
    }, {
      "id": 6,
      "message": "posuere cubilia curae donec pharetra magna vestibulum",
      "blogId": 3,
      "userId": 1
    }, {
      "id": 7,
      "message": "porttitor lacus at turpis",
      "blogId": 2,
      "userId": 2
    }, {
      "id": 8,
      "message": "consequat dui nec nisi volutpat",
      "blogId": 5,
      "userId": 1
    }, {
      "id": 9,
      "message": "justo eu massa donec dapibus duis at velit",
      "blogId": 3,
      "userId": 2
    }, {
      "id": 10,
      "message": "luctus et ultrices posuere cubilia curae duis",
      "blogId": 1,
      "userId": 1
    }, {
      "id": 11,
      "message": "mauris laoreet ut rhoncus aliquet",
      "blogId": 1,
      "userId": 2
    }, {
      "id": 12,
      "message": "molestie lorem quisque",
      "blogId": 5,
      "userId": 3
    }, {
      "id": 13,
      "message": "bibendum imperdiet nullam orci pede",
      "blogId": 1,
      "userId": 2
    }, {
      "id": 14,
      "message": "at velit vivamus vel nulla eget eros elementum",
      "blogId": 3,
      "userId": 1
    }, {
      "id": 15,
      "message": "in eleifend quam a",
      "blogId": 4,
      "userId": 1
    }, {
      "id": 16,
      "message": "in magna bibendum imperdiet nullam orci pede venenatis non",
      "blogId": 1,
      "userId": 3
    }, {
      "id": 17,
      "message": "sed vestibulum sit amet cursus id turpis",
      "blogId": 5,
      "userId": 1
    }, {
      "id": 18,
      "message": "porttitor id consequat in consequat",
      "blogId": 4,
      "userId": 1
    }, {
      "id": 19,
      "message": "at velit eu",
      "blogId": 5,
      "userId": 3
    }, {
      "id": 20,
      "message": "ligula in lacus curabitur at",
      "blogId": 6,
      "userId": 4
    }]
    data.forEach(item => {
      item.createdAt = Sequelize.literal("NOW()")
      item.updatedAt = Sequelize.literal("NOW()")
    })
    await queryInterface.bulkInsert("Comments", data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Comments", null, {})
  }
};
