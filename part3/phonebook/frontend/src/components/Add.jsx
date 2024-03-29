/* eslint-disable react/prop-types */
import { Header } from './Header';

export const Add = ({ handleSubmit, handleChange, newName }) => {
	return (
		<>
			<Header text={'Add a new person'} level={'h2'} />
			<form action="submit" onSubmit={(e) => handleSubmit(e)}>
				<label htmlFor="name">Name</label>
				<input
					id="name"
					placeholder="Name"
					value={newName.name}
					onChange={(e) => handleChange(e)}
				/>

				<label htmlFor="number">Number</label>
				<input
					id="number"
					placeholder="12-12345678"
					value={newName.number}
					onChange={(e) => handleChange(e)}
				/>

				<button type="submit">Add</button>
			</form>
		</>
	);
};
