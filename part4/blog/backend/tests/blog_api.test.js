const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const data = require('./data');
const api = supertest(app);
const list_helper = require('../utils/list_helper');

beforeEach(async () => {
	await Blog.deleteMany({});
	let blogs = data.blogs.map(blog => new Blog(blog));
	const promiseArr = blogs.map(arr => arr.save());

	await Promise.all(promiseArr);
});

describe('saving the basic data', () => {

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
});

describe('adding a new blog', () => {

	test('succeeds with valid data', async () => {

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

	test('if likes is empty, defaults to 0', async () => {

		await api
			.post('/api/blogs')
			.send(data.newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const response = await api.get('/api/blogs');
		const length = response.body.length -1;
		const newBlog = response.body[length];

		expect(newBlog.likes).toBe(0);

	});

	test('fails if title is not valid', async () => {
		await api
			.post('/api/blogs')
			.send(data.noTitle)
			.expect(400);

		const blogs = await list_helper.dataInDB();
		expect(blogs).toHaveLength(data.blogs.length);
	});

	test('fails if author is not valid', async () => {
		await api
			.post('/api/blogs')
			.send(data.noAuthor)
			.expect(400);

		const blogs = await list_helper.dataInDB();
		expect(blogs).toHaveLength(data.blogs.length);
	});

	test('fails if title or author is not valid', async () => {
		await api
			.post('/api/blogs')
			.send(data.noTitleOrAuthor)
			.expect(400);

		const blogs = await list_helper.dataInDB();
		expect(blogs).toHaveLength(data.blogs.length);
	});

	test('fails if url is not valid', async () => {
		await api
			.post('/api/blogs')
			.send(data.noUrl)
			.expect(400);

		const blogs = await list_helper.dataInDB();
		expect(blogs).toHaveLength(data.blogs.length);
	});

	test('fails if no data is added', async () => {
		await api
			.post('/api/blogs')
			.send(data.emptyBlog)
			.expect(400);

		const blogs = await list_helper.dataInDB();
		expect(blogs).toHaveLength(data.blogs.length);
	});

});

describe('deleting a blog using click', () => {
	let blogToDelete = [];
	const blogID = '5a422a851b54a676234d17f7';
	test('find the React Patterns blog', async () => {
		const response = await api.get('/api/blogs');
		blogToDelete = response.body.filter(array => array.id === blogID);
		expect(blogToDelete[0].title).toContain('React patterns');
	});

	test('deletes selected blog', async () => {
		await api
			.delete('/api/blogs/5a422a851b54a676234d17f7')
			.expect(204)
			.then(async () => {
				expect(await Blog.findById({ _id: blogID })).toBeFalsy();
			});
	});
});

afterAll(() => {
	mongoose.connection.close();
});

