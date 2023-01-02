/* eslint-disable no-undef */
const ratingRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const middleware = require('../utils/middleware');

const Blog = require('../models/blog');
const User = require('../models/user');
const Rating = require('../models/rating');

ratingRouter.get('/', async (request, response) => {
	const ratings = await Rating.find({});
	response.json(ratings);
});

ratingRouter.get('/:id', async (request, response) => {
	const rating = await Rating.findById(request.params.id);
	if(rating){
		response.json(rating);
	} else{
		response.status(404).end();
	}
});

ratingRouter.put('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id);
	const ratingData = await Rating.findById(blog.likes);

	const token = middleware.getTokenFrom(request);
	console.log('config',request.get('authorization'));
	console.log('token', token);
	const decodedToken = jwt.verify(token, process.env.SECRET);

	const user = await User.findById(decodedToken.id);
	const alreadyVoted = user.ratings.includes(ratingData.id);

	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' });

	}else if(alreadyVoted){
		return response.status(418).json({ error: 'already voted' });
	} else{
		ratingData.users = ratingData.users.concat(user._id);

		const savedRating = await ratingData.save();

		user.ratings = user.ratings.concat(savedRating._id);
		await user.save();

		blog.likes = blog.likes.concat(ratingData._id);
		console.log(blog);
		const savedBlog = await blog.save();

		response.status(201).json(savedBlog);
	}


});

module.exports = ratingRouter;
