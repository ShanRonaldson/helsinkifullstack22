const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const data = require('./data');

beforeEach(async () => {
	await Blog.deleteMany({});
	let blogs = data.blogs;
	let i = 0;
	while(i < blogs.length){
		const obj = new Blog(blogs[i]);
		await obj.save();
		i++;
	}
});

const api = supertest(app);

test('blog list is returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);
}, 100000);

test('all notes are returned (6)', async () => {
	const response = await api.get('/api/blogs');

	expect(response.body).toHaveLength(data.blogs.length);
});

test('React Patterns title does occur', async () => {
	const response = await api.get('/api/blogs');
	const titles = response.body.map(arr => arr.title);

	expect(titles).toContain('React patterns');

});

test('add a new note', async () => {

	await api
		.post('/api/blogs')
		.send(data.newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/);

	const response = await api.get('/api/blogs');
	const titles = response.body.map(arr => arr.title);

	expect(response.body).toHaveLength(data.blogs.length + 1);
	expect(titles).toContain(data.newBlog.title);
});

afterAll(() => {
	mongoose.connection.close();
});

