/* eslint-disable no-undef */
const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware');

const Blog = require('../models/blog');
const User = require('../models/user');
const Rating = require('../models/rating');

blogRouter.get('/', async (request, response) => {
	const blogs = await	Blog.find({}).populate('user', { username: 1, name: 1 });
	response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
	const body = await request.body;
	const token = middleware.getTokenFrom(request);

	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' });
	}

	const user = await User.findById(decodedToken.id);
	const rating = new Rating({
		value: 1
	});
	const savedRating = await rating.save();

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: savedRating._id,
		user: user._id
	});

	const savedBlog = await blog.save();

	rating.blog = savedBlog._id;
	rating.users = rating.users.concat(user._id);


	user.blogs = user.blogs.concat(savedBlog._id);
	user.ratings = user.ratings.concat(savedRating._id);
	await user.save();

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

// update an existing blog
blogRouter.put('/:id', async (request, response) => {
	const { title, author, url } = request.body;

	const data = await Blog.findById(request.params.id);
	const user = await User.findById(data.user);

	const token = middleware.getTokenFrom(request);

	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' });
	} else if(user.id !== decodedToken.id){
		return response.status(401).json({ error: 'invalid login. not the creator of the blog' });
	}

	const blog = await Blog.findByIdAndUpdate(request.params.id,{ title, author, url }, { new: true });

	middleware.sendData(blog, response, Blog);
});

module.exports =  blogRouter ;
