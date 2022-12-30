import { useEffect, useState } from 'react';
import { List } from './components/List';
import { Input } from './components/Input';
import { getAll, setToken } from './services/blogService';
import { Login } from './components/Login';

function App() {
	const [blogs, setBlogs] = useState([]);

	const [user, setUser] = useState(null);

	useEffect(() => {
		getAll()
			.then((data) => {
				setBlogs(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleAdd = data => {
		setBlogs(data);
	};

	const handleUpdate = (data) => {
		setBlogs(data);
	};


	return (
		<>{ user === null ?
			<Login setUser={setUser} setToken={setToken}/> :
			<Input handleAdd={handleAdd}/>}

		<List
			loggedInState={user !== null}
			blogs={blogs}
			handleUpdate={handleUpdate}
		/>
		</>
	);
}

export default App;
