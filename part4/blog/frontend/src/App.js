import { useEffect, useState } from 'react';
import { List } from './components/List';
import { Input } from './components/Input';
import { getAll, create, remove } from './services/server';


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

	const handleDelete = (id) => {
		let toDelete = blogs.filter((blog) => blog.id === id);

		if(window.confirm(`Are you sure you want to delete ${toDelete[0].title} ?`)){
			remove(id)
				.then(getAll().then(data => setBlogs(data)))
				.catch(err => {
					console.log(err);
				});
		}
	};

	return (
		<>
			<Input newBlog={newBlog} setNewBlog={setNewBlog} handleChange={handleChange} handleSubmit={addNew} />

			<List blogs={blogs} handleDelete={handleDelete}/>
		</>
	);
}

export default App;
