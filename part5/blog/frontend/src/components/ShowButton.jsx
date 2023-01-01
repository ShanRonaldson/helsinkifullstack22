/* eslint-disable react/prop-types */
export const ShowButton = ({ message, handleClick }) => {

	return(
		<>
			<button onClick={() => handleClick()} className='center'>
				{message}
			</button>
		</>
	);

};
