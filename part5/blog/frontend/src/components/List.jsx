import { Row } from './Row';
import { TableHeading } from './TableHeading';

/* eslint-disable react/prop-types */
export const List = ({ blogs, handleUpdate, loggedInState, setMessage }) => {
	return(
		<>
			{blogs.length < 0 ?
				<>
					<h2>Blog List</h2>
					<table>
						<TableHeading/>
					</table>

				</>
				:
				<>
					<h2>Blog List</h2>
					<table>
						<TableHeading/>
						<tbody>
							{blogs.map((blog, id) => (
								<Row key={id} blog={blog} handleUpdate={handleUpdate} loggedInState={loggedInState} setMessage={setMessage}/>
							))}
						</tbody>
					</table>
				</>
			}
		</>
	);
};
