import { useState } from 'react'
import { update, getAll, remove, addLikes } from '../services/blogService'
import PropTypes from 'prop-types'

export const Row = ({ id, blog, handleUpdate, loggedInState, setMessage }) => {
  const [startEdit, setStartEdit] = useState(false)
  const [blogClone, setClone] = useState({})

  const handleChange = (e) => {
    setClone({ ...blogClone, [e.target.id]: e.target.value })
  }

  const handleEdit = () => {
    if (startEdit) {
      if (window.confirm('Are you sure you want to save these changes?')) {
        update(blog.id, blogClone)
          .then(() => {
            getAll().then((data) => {
              handleUpdate(data)
              setMessage({
                content: `'${blog.title}' updated!`,
                type: 'updated',
              })
              setTimeout(() => {
                setMessage({})
              }, 5000)
            })
          })
          .catch((err) => {
            console.log('handle edit error', err)
            setMessage({
              content: `An error occurred, unable to edit '${blog.title}'. Please try again.`,
              type: 'error',
            })
            setTimeout(() => {
              setMessage({})
            }, 5000)
          })
        setStartEdit(false)
      }
    } else {
      setClone(blog)
    }
  }

  const handleDelete = (id) => {
    let toDelete = blog
    if (window.confirm(`Are you sure you want to delete ${toDelete.title} ?`)) {
      remove(id)
        .then(
          getAll().then((data) => {
            handleUpdate(data)
            setMessage({ content: `'${blog.title}' deleted!`, type: 'delete' })
            setTimeout(() => {
              setMessage({})
            }, 5000)
          })
        )
        .catch((err) => {
          console.log(err)
          setMessage({
            content: `An error occurred, unable to delete '${blog.title}'. Please try again.`,
            type: 'error',
          })
          setTimeout(() => {
            setMessage({})
          }, 5000)
        })
    }
  }

  const addLike = () => {
    console.log('blog', blog)
    addLikes(blog.id)
      .then(() => {
        getAll().then(data => {
          handleUpdate(data)
          setMessage({
            content: `'${blog.title}' liked!`,
            type: 'updated',
          })
          setTimeout(() => {
            setMessage({})
          }, 5000)
        })
      }).catch((err) => {
        console.log('update likes error', err)
        setMessage({
          content: `You've already liked '${blog.title}'!`,
          type: 'error',
        })
        setTimeout(() => {
          setMessage({})
        }, 5000)
      })
  }

  return (
    <tr key={id}>
      <td>
        {startEdit ? (
          <input
            required
            type="text"
            id="title"
            value={blogClone.title}
            onChange={(event) => handleChange(event)}
          />
        ) : (
          blog.title
        )}
      </td>
      <td>
        {startEdit ? (
          <input
            required
            type="text"
            id="author"
            value={blogClone.author}
            onChange={(event) => handleChange(event)}
          />
        ) : (
          blog.author
        )}
      </td>
      <td>
        {startEdit ? (
          <input
            required
            type="text"
            id="url"
            value={blogClone.url}
            onChange={(event) => handleChange(event)}
          />
        ) : (
          blog.url
        )}
      </td>
      <td>
        {blog.likes.length}
      </td>
      {loggedInState ? (
        <>
          <td>
            <button
              className="delete-button"
              onClick={() => handleDelete(blogClone)}
            > Delete
            </button>
          </td>
          <td>
            {startEdit ? (
              <button onClick={() => handleEdit()}>Save</button>
            ) : (
              <button
                className="edit-button"
                onClick={() => (setStartEdit(true), setClone(blog))}
              > Edit
              </button>
            )}
          </td>
          <td>
            <button onClick={() => ( addLike(), setClone(blog))}>I Like This!</button>
          </td>
        </>
      ) : (
        ''
      )}
    </tr>
  )
}

Row.propTypes = {
  id: PropTypes.any.isRequired,
  blog: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  loggedInState: PropTypes.bool.isRequired,
  setMessage: PropTypes.func
}
