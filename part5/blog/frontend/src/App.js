import { useEffect, useState } from 'react';
import { List } from './components/List';
import { Input } from './components/Input';
import { getAll, setToken } from './services/blogService';
import { Login } from './components/Login';
import { Logout } from './components/Logout';
import { Heading } from './components/Heading';
import { Message } from './components/Message';

function App() {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [loginState, setLoginState] = useState(false);
	const [message, setMessage] = useState({});

	useEffect(() => {
		getAll()
			.then((data) => {
				setBlogs(data);
			})
			.catch((err) => {
				setMessage({ content: 'An error occurred - unable to load data please see console logs for more information', type: 'error' });
				console.log(err);
				setTimeout(() => {
					setMessage({});
				}, 5000);
			});
	}, []);

	const handleAdd = data => {
		setBlogs(data);
	};

	const handleUpdate = (data) => {
		setBlogs(data);
	};

	const handleCredentials = (user) => {
		if(loginState){
			setToken(null);
			setUser(null);
			window.localStorage.removeItem(
				'loggedAppUser'
			);
			setLoginState(false);
		} else{
			setToken(user.token);
			setUser(user);
			window.localStorage.setItem(
				'loggedAppUser', JSON.stringify(user)
			);
		}
	};

	return (
		<>
			<Message message={message.content} type={message.type}/>
			{ user === null ?
				<Login handleCredentials={handleCredentials} setLoginState={setLoginState} setMessage={setMessage}/> :
				<>
					<Heading message={`Welcome ${user.name} !`}/>
					<Logout handleCredentials={handleCredentials} />
					<Input handleAdd={handleAdd} setMessage={setMessage}/>
					<List
						setMessage={setMessage}
						loggedInState={user !== null}
						blogs={blogs}
						handleUpdate={handleUpdate}
					/>
				</>
			}
		</>
	);
}

export default App;
