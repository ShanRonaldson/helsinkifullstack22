/* eslint-disable react/prop-types */
export const Message = ({ message, type }) => {
	if (message === null || type === null) {
		return null;
	}

	return (
		<>
			<div className={`notification ${type}`}>{message}</div>
		</>
	);
};
