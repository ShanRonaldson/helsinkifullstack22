/* eslint-disable react/prop-types */
export const Logout = ({ handleCredentials }) => {

	const handleLogout = () => {
		handleCredentials('data');
	};

	return(
		<>
			<button type="submit" onClick={() => handleLogout()}>Logout</button>
		</>
	);
};
