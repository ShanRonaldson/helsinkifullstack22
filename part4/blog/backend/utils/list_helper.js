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
	} else if(blogs.length > 0){
		let result = 0;
		blogs.map(blog => {
			result += blog.likes;
		});
		return result;
	}
};


module.exports = { dummy, totalLikes };
