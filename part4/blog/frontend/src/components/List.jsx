/* eslint-disable react/prop-types */
export const List = ({ blogs }) => {

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
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};
