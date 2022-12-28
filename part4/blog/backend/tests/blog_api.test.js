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

describe('update a blog using click', () => {
	let blogToEdit = [];
	const blogId = '5a422bc61b54a676234d17fc';
	const newTitle = 'Type War title change';
	const newAuthor = 'New Author';
	const newUrl = 'www.new.url';
	const newLikes = 20;

	test('find the Type Wars blog', async () => {
		const response = await api.get('/api/blogs');
		blogToEdit = response.body.filter(array => array.id === blogId);
		expect(blogToEdit[0].title).toContain('Type wars');
	});

	test('can edit and update title', async () => {
		await api.put(`/api/blogs/${blogId}`)
			.send({ title: newTitle })
			.expect(200)
			.then(async () => {
				const edited = await Blog.findById({ _id: blogId });
				expect(edited.title).toContain(newTitle);
			});
	});

	test('can edit and update author', async () => {
		await api.put(`/api/blogs/${blogId}`)
			.send({ author: newAuthor })
			.expect(200)
			.then(async () => {
				const edited = await Blog.findById({ _id: blogId });
				expect(edited.author).toContain(newAuthor);
			});
	});

	test('can edit and update url', async () => {
		await api.put(`/api/blogs/${blogId}`)
			.send({ url: newUrl })
			.expect(200)
			.then(async () => {
				const edited = await Blog.findById({ _id: blogId });
				expect(edited.url).toContain(newUrl);
			});
	});

	test('can edit and update likes', async () => {
		await api.put(`/api/blogs/${blogId}`)
			.send({ likes: newLikes })
			.expect(200)
			.then(async () => {
				const edited = await Blog.findById({ _id: blogId });
				expect(edited.likes).toEqual(newLikes);
			});
	});
});

afterAll(() => {
	mongoose.connection.close();
});

