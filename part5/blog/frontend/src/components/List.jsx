import { Row } from './Row';

/* eslint-disable react/prop-types */
export const List = ({ blogs, handleDelete, handleUpdate }) => {

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
							<Row key={id} blog={blog} handleDelete={handleDelete} handleUpdate={handleUpdate} />
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
