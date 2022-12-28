const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
	const blogs = await	Blog.find({});
	response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
	const body = await request.body;

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: (body.likes > 0) ? body.likes : 0
	});

	const savedBlog = await blog.save();
	response.status(201).json(savedBlog);
});

// get all data in api format
blogRouter.get('/api/blogs', async (request, response) => {
	const blogList = await Blog.find({});
	response.json(blogList);
});

// delete function
blogRouter.delete('/:id', async(request, response) => {
	await Blog.findByIdAndDelete(request.params.id);
	response.status(204).end();
});

//get one id
blogRouter.get('/:id', async(request, response) => {
	const blog = await Blog.findById(request.params.id);

	if(blog){
		response.json(blog);
	}else{
		response.status(404).end();
	}
});

module.exports =  blogRouter ;
