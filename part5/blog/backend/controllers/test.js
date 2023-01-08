const testingRouter = require('express').Router();

const Blog = require('../models/blog');
const User = require('../models/user');
const Rating = require('../models/rating');

testingRouter.post('/resetAll', async(request, response) => {
	await Blog.deleteMany({});
	await User.deleteMany({});
	await Rating.deleteMany({});

	response.status(204).end();
});

module.exports = testingRouter;
