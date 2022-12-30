/* eslint-disable react/prop-types */
import { useState } from 'react';
import { update, getAll, remove } from '../services/blogService';


export const Row = ({ id, blog, handleUpdate, loggedInState }) => {
	const [startEdit, setStartEdit] = useState(false);
	const [blogClone, setClone] = useState({});
	/* const [editedBlog, setEditedBlog] = useState({}); */
	/* const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: 0 }); */

	const handleChange = (e) => {
		setClone({ ...blogClone, [e.target.id]: e.target.value });
	};

	const handleEdit = () => {
		if(startEdit){
			if(window.confirm('Are you sure you want to save these changes?')){
				update(blog.id, blogClone).then(() => {
					getAll().then(data => {
						handleUpdate(data);
					});
				});
				setStartEdit(false);
			}
		} else{
			setClone(blog);
		}
	};

	const handleDelete = (id) => {
		let toDelete = blog;
		if (
			window.confirm(`Are you sure you want to delete ${toDelete.title} ?`)
		) {
			remove(id)
				.then(getAll().then((data) => handleUpdate(data)))
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return(
		<tr key={id}>
			<td>{startEdit ? <input required type='text' id='title' value={blogClone.title} onChange={(event) => handleChange(event)}/> : blog.title}</td>
			<td>{startEdit ? <input required type='text' id='author' value={blogClone.author} onChange={(event) => handleChange(event)}/> : blog.author}</td>
			<td>{startEdit ? <input required type='text' id='url' value={blogClone.url} onChange={(event) => handleChange(event)}/> : blog.url}</td>
			<td>{startEdit ? <input type='number' id='likes' value={blogClone.likes} onChange={(event) => handleChange(event)}/> : blog.likes}</td>
			{ loggedInState ? <>
				<td><button className="delete-button" onClick={() => handleDelete(blogClone)}>Delete</button></td>
				<td>{startEdit ? <button onClick={() =>  handleEdit()}>Save</button> :
					<button className="edit-button" onClick={() => (setStartEdit(true), setClone(blog))}>
                Edit</button>
				}
				</td>
			</> : ''
			}
		</tr>
	);

};
