import { useEffect, useState } from 'react';
import { List } from './components/List';
import { Input } from './components/Input';
import { getAll, create } from './services/server';


function App() {

	const [blogs, setBlogs] = useState([]);
	const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: 0 });

	useEffect(() => {
		getAll().then(data => {
			setBlogs(data);
		}).catch(err => {
			console.log(err);
		});
	}, []);


	const handleChange = (e) => {
		setNewBlog({ ...newBlog, [e.target.id]: e.target.value });
	};

	const addNew = (e) => {
		e.preventDefault();
		create(newBlog)
			.then(() => {
				getAll().then(data => {
					setBlogs(data);
				});
			})
			.catch(err => {
				console.log(err);
			});

		setNewBlog({ title: '', author: '', url: '', likes: 0 });
	};

	return (
		<>
			<Input newBlog={newBlog} setNewBlog={setNewBlog} handleChange={handleChange} handleSubmit={addNew} />

			<List blogs={blogs} />
		</>
	);
}

export default App;
