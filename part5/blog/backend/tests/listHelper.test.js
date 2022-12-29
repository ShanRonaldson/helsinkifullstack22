const listHelper = require('../utils/list_helper');
const data = require('./data');

test('dummy returns 1', () => {
	const blogs = [];

	const result = listHelper.dummy(blogs);

	expect(result).toBe(1);
});


describe('total likes', () => {

	test('total likes of empty blog should be 0', () => {
		const result = listHelper.totalLikes(data.emptyBlog);
		expect(result).toBe(0);
	});

	test('when list has 1 blog, expect total likes to equal that number of likes', () => {
		const result = listHelper.totalLikes(data.listWithOneBlog);
		expect(result).toBe(5);
	});

	test('the sum of a large list is calculated correctly', () => {
		const result = listHelper.totalLikes(data.blogs);
		expect(result).toBe(data.blogCount);
	});

});

describe('most popular blog', () => {

	test('most popular blog of an empty blog should be 0', () => {
		const result = listHelper.favoriteBlog(data.emptyBlog);
		expect(result).toEqual('No blogs found');
	});

	test('most popular blog of one list of one should be that blog', () => {
		const result = listHelper.favoriteBlog(data.listWithOneBlog);
		expect(result).toEqual(data.listWithOneBlog);
	});

	test('most popular blog of a large list is correct', () => {
		const result = listHelper.favoriteBlog(data.blogs);
		expect(result).toEqual(data.mostPopular);
	});
});
