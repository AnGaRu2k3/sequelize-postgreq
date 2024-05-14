

const { Blog, User, Comment, Category, Tag } = require("../models");
const Sequelize = require('sequelize');
const { Op } = require("sequelize");

const controller = {}
controller.allBlogs = async (req, res) => {
    try {
        // atribute to render sidebar
        const { groupedBlogsByCategoryData, allTags } = await computeSiderBarAtr();
        const searchValue = req.query.search || "";
        const category = req.query.category || "";
        const tags = (req.query.tags || "").split(',');
        console.log(tags, category, searchValue)
        let blogs = await Blog.findAll();
        let filteredBlogs = [];
        // kiểm tra filterValue
        if (searchValue != "") {
            for (const blog of blogs)
                if(!blog.title.toLowerCase().includes(searchValue.toLowerCase())) continue;
                else filteredBlogs.push(blog);
            blogs = filteredBlogs;
        }
        filteredBlogs = []
        // kiểm tra category
        if (category != "") {
            for (const blog of blogs) {
                const categoryOfName = await Category.findOne({
                    where: { name: category}
                })
                if (categoryOfName.id != blog.categoryId) continue;
                else filteredBlogs.push(blog)
            }
            blogs = filteredBlogs;
        }
        filteredBlogs = []  
        // kiểm tra tag
        if (tags.length != 0) {
            for (const blog of blogs) {
                const blogTag = await Blog.findOne({
                    where: { id: blog.id },
                    include: [{
                        model: Tag,
                        through: 'BlogTag', // Tên bảng liên kết giữa Blog và Tag
                    }]
                });
                const listTags = blogTag.Tags.map(item => item.name);

                if (!listTags.some(tag => tags.includes(tag))) {
                    filteredBlogs.push(blog);
                }
            }
            blogs = filteredBlogs
        }
        let blogsComments = []
        for (const blog of blogs) {
            const comments = await Comment.findAll({
                where : {blogId: blog.id}
            })
            blogsComments.push({ 
                blog: blog, 
                commentsCount: comments.length 
            });
        }

        blogs = blogsComments
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
        console.log(blogTag.Tags)
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
