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
