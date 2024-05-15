

const { Blog, User, Comment, Category, Tag } = require("../models");
const Sequelize = require('sequelize');
const { Op } = require("sequelize");

const controller = {}
controller.allBlogs = async (req, res) => {
    try {
        // atribute to render sidebar
        const { groupedBlogsByCategoryData, allTags } = await computeSiderBarAtr();
        const qSearchValue = req.query.search || "";
        const qCategory = req.query.category || "";
        const qTags = req.query.tags ? req.query.tags.split(',') : [];
        const blogsList = await Blog.findAll();
        const categoriesList = await Category.findAll();
        const commentsList = await Comment.findAll();
        const blogTagList = await Blog.findAll({
            include: [{
                model: Tag,
                through: 'BlogTag', // Tên bảng liên kết giữa Blog và Tag
            }]
        });
        let blogs = blogsList
        let filteredBlogs = [];
        // kiểm tra filterValue
        if (qSearchValue != "") {
            for (const blog of blogs)
                if(!blog.title.toLowerCase().includes(qSearchValue.toLowerCase())) continue;
                else filteredBlogs.push(blog);
            blogs = filteredBlogs;
        }
        filteredBlogs = []
        // kiểm tra category
        if (qCategory != "") {
            for (const category of categoriesList) {
                if (qCategory == category.name) {
                    for (const blog of blogs) {
                        if (blog.categoryId == qCategory) filteredBlogs.push(blog)
                    }
                }   
            }
            blogs = filteredBlogs;
        }
        filteredBlogs = []   
        // kiểm tra tag
        if (qTags.length != 0) {
            for (const blogTag of blogTagList) {
                const tags = blogTag.Tags.map(item => item.name)
                for (const tag of tags) if (qTags.includes(tag)) {
                    filteredBlogs.push(blogTag)
                    break
                }
            }
            blogs = filteredBlogs
        }

        // đếm commentCount
        for (const blog of blogs) {
            let cnt = 0
            for (const comment of commentsList) {
                if (comment.blogId == blog.id) cnt++
            }
            blog.commentsCount = cnt
        }
        res.render("index", { groupedBlogsByCategoryData, allTags, blogs })
    } catch (error) {
        `console.error("Error fetching blogList:", error);
        res.status(500).send("Internal Server Error");`
    }

}
controller.detailBlog = async (req, res) => {
    try {
        // atribute to render sidebar
        const { groupedBlogsByCategoryData, allTags } = await computeSiderBarAtr();

        // render detailBlog
        const blogId = req.params.id;
        const blog = (await Blog.findOne({
            where: { id: blogId }
        })).get()
        // console.log( blog.authoredId) 
        const user = (await User.findOne({
            where: { id: blog.authoredId }
        })).get()
        const comments = await Comment.findAll({
            where: { blogId: blogId }
        })
        const category = (await Category.findOne({
            where: { id: blog.categoryId }
        })).get()
        // tìm những tags thuộc blog
        const blogTag = await Blog.findOne({
            where: { id: blogId },
            include: [{
                model: Tag,
                through: 'BlogTag', // Tên bảng liên kết giữa Blog và Tag
            }]
        });
        // console.log(blogTag)
        const tags = blogTag.Tags.map(item => item.name)

        if (!blog) {
            return res.status(404).send("Blog not found");
        }
        res.render("details", { blog, comments, user, category, tags, groupedBlogsByCategoryData, allTags });

    } catch (error) {
        console.error("Error fetching blog details:", error);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = controller;

async function computeSiderBarAtr() {
    const groupedBlogsByCategory = await Blog.findAll({
        attributes: [
            [Sequelize.col('Category.name'), 'categoryName'],
            [Sequelize.fn('COUNT', Sequelize.col('*')), 'count']
        ],
        include: [{
            model: Category,
            attributes: [], // Chỉ chọn trường name từ model Category
        }],
        group: ['Category.name'],
        raw: true
    });
    const groupedBlogsByCategoryData = groupedBlogsByCategory.map(item => ({
        category: item['categoryName'],
        blogsCount: item['count']
    }));

    const allTags = (await Tag.findAll()).map(item => item.name);
    return { groupedBlogsByCategoryData, allTags };
}
