const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const userData = require('./userData');
const list_helper = require('../utils/list_helper');
const bcrypt = require('bcrypt');

const api = supertest(app);

describe('when there is already one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const hash = await bcrypt.hash( 'admin', 10);
		const user = new User(
			{ username: userData.rootUser.username,
				name: userData.rootUser.name,
				password: hash
			}
		);

		await user.save();
	});

	test('new user is created successfully', async () => {
		const usersAtStart = list_helper.usersInDB();

		await api
			.post('/api/users')
			.send(userData.newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const usersAtEnd = await list_helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

		const usernames = usersAtEnd.map(u => u.username);
		expect(usernames).toContain(userData.newUser.username);
	});

	test('cannot create new user is username is taken', async () => {
		const usersAtStart = list_helper.usersInDB();

		const result = await api
			.post('/api/users')
			.send(userData.fakeRoot)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('username must be unique');

		const usersAtEnd = await list_helper.usersInDb();
		expect(usersAtEnd).toEqual(usersAtStart);
	});
});


afterAll(() => {
	mongoose.connection.close();
});
