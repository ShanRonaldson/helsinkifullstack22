/* eslint-disable react/prop-types */
export const List = ({ blogs, handleDelete }) => {

	if(blogs.length > 0){
		return(
			<>
				<h2>Blog list</h2>
				<table>
					<thead>
						<tr>
							<th>Title</th>
							<th>Author</th>
							<th>URL Link</th>
							<th>Number of Likes</th>
						</tr>
					</thead>
					<tbody>
						{blogs.map((blog, id) => (
							<tr key={id}>
								<td>{blog.title}</td>
								<td>{blog.author}</td>
								<td>{blog.url}</td>
								<td>{blog.likes}</td>
								<td><button className="delete-button" onClick={() => handleDelete(blog.id)}>Delete</button></td>
							</tr>
						))}
					</tbody>
				</table>
			</>
		);} else{
		return(
			<>
				<h2>Blog list</h2>
				<table>
					<thead>
						<tr>
							<th>Title</th>
							<th>Author</th>
							<th>URL Link</th>
							<th>Number of Likes</th>
						</tr>
					</thead>
				</table>
			</>
		);
	}
};
