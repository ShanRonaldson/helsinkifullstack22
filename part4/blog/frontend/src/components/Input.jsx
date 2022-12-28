/* eslint-disable react/prop-types */
export const Input = ({ newBlog, handleSubmit, handleChange }) => {

	return (
		<>
			<h2>Add new blog</h2>
			<form className="form" action="submit" onSubmit={(e) => handleSubmit(e)}>
				<label htmlFor="title" className="title">Title</label>
				<input
					className="title"
					required={true}
					type="text"
					name="title"
					id="title"
					value={newBlog.title}
					onChange={(e) => handleChange(e)}
				/>

				<label htmlFor="author" className="author">Author</label>
				<input
					className="author"
					type="text"
					required={true}
					name="author"
					id="author"
					value={newBlog.author}
					onChange={(e) => handleChange(e)}
				/>

				<label htmlFor="url" className="link">Blog URL</label>
				<input
					className="link"
					type="text"
					name="url"
					id="url"
					required
					value={newBlog.url}
					onChange={(e) => handleChange(e)}
				/>

				<label htmlFor="likes" className="likes">Number of likes</label>
				<input
					className="likes"
					type="number"
					name="likes"
					id="likes"
					value={newBlog.likes}
					onChange={(e) => handleChange(e)}
				/>
				<button className="submit" type="submit">Add new blog listing</button>
			</form>
		</>
	);
};
