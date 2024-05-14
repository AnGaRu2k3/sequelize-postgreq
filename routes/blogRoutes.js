const express = require('express')
const route = express.Router()
const controller = require('../controllers/controller')

route.get("/", controller.allBlogs)
route.get("/:id", controller.detailBlog)

module.exports = route