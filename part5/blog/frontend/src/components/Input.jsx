import { useState } from 'react'
import { create, getAll } from '../services/blogService'
import PropTypes from 'prop-types'

export const Input = ({ handleAdd, setMessage }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0,
  })

  const handleChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    create(newBlog)
      .then(() => {
        getAll().then((data) => {
          handleAdd(data)
          setMessage({
            content: `'${newBlog.title}' created!`,
            type: 'created',
          })
          setTimeout(() => {
            setMessage({})
          }, 5000)
        })
      })
      .catch((err) => {
        console.log(err)
        setMessage({
          content: `'${newBlog.title}' unable to be created. Please try again.`,
          type: 'error',
        })
        setTimeout(() => {
          setMessage({})
        }, 5000)
      })

    setNewBlog({ title: '', author: '', url: '', likes: 0 })
  }

  return (
    <>
      <h2>Add new blog</h2>
      <form className="form" action="submit" onSubmit={handleSubmit}>
        <label htmlFor="title" className="title">
          Title
        </label>
        <input
          data="title-input"
          className="title"
          required={true}
          type="text"
          name="title"
          id="title"
          value={newBlog.title}
          onChange={(e) => handleChange(e)}
        />

        <label htmlFor="author" className="author">
          Author
        </label>
        <input
          data="author-input"
          className="author"
          type="text"
          required={true}
          name="author"
          id="author"
          value={newBlog.author}
          onChange={(e) => handleChange(e)}
        />

        <label htmlFor="url" className="link">
          Blog URL
        </label>
        <input
          data="url-input"
          className="link"
          type="text"
          name="url"
          id="url"
          required
          value={newBlog.url}
          onChange={(e) => handleChange(e)}
        />
        <button className="submit" type="submit" data='submit-new-blog-button'>
          Add new blog listing
        </button>
      </form>
    </>
  )
}

Input.propTypes = {
  handleAdd: PropTypes.func.isRequired,
  setMessage: PropTypes.func,
}
