/* eslint-disable no-unused-vars */
const dummy = (blogs) => {
	/* if(blogs.length > 0){
		return 1;
	} else{
		return 0;
	} */

	return 1;
};

const totalLikes = (blogs) => {

	if(blogs.length < 1){
		return 0;
	} else{
		let result = 0;
		blogs.map(blog => {
			result += blog.likes;
		});
		return result;
	}
};

const favoriteBlog = (blogs) => {

	if(blogs.length < 1){
		return 'No blogs found';
	} else {
		const result = Math.max(...blogs.map(blog => blog.likes));
		const obj = [blogs.find(blog =>  blog.likes === result)];

		return obj;
	}
};


module.exports = { dummy, totalLikes, favoriteBlog };
