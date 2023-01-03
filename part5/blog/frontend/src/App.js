import { useEffect, useState } from 'react'
import { List } from './components/List'
import { Input } from './components/Input'
import { getAll, setToken } from './services/blogService'
import { Login } from './components/Login'
import { Logout } from './components/Logout'
import { Heading } from './components/Heading'
import { Message } from './components/Message'
import { ShowButton } from './components/ShowButton'

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [loginState, setLoginState] = useState(false)
  const [message, setMessage] = useState({})
  const [show, setShow] = useState(false)

  const sortByLikes = (a, b) => {
    let lengthA = a.likes.length
    let lengthB = b.likes.length

    return lengthB - lengthA
  }

  useEffect(() => {
    getAll()
      .then((data) => {
        let sorted = data.sort(sortByLikes)
        setBlogs(sorted)
      })
      .catch((err) => {
        setMessage({
          content:
            'An error occurred - unable to load data please see console logs for more information',
          type: 'error',
        })
        console.log(err)
        setTimeout(() => {
          setMessage({})
        }, 5000)
      })
  }, [])

  const handleAdd = (data) => {
    setShow(false)
    let sorted = data.sort(sortByLikes)
    setBlogs(sorted)
  }

  const handleUpdate = (data) => {
    let sorted = data.sort(sortByLikes)
    setBlogs(sorted)
  }

  const handleCredentials = (user) => {
    if (loginState) {
      setToken(null)
      setUser(null)
      window.localStorage.removeItem('loggedAppUser')
      setLoginState(false)
    } else {
      setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
    }
  }

  const handleShow = () => {
    show ? setShow(false) : setShow(true)
  }

  return (
    <>
      <Message message={message.content} type={message.type} />
      {user === null ? (
        <Login
          handleCredentials={handleCredentials}
          setLoginState={setLoginState}
          setMessage={setMessage}
        />
      ) : (
        <>
          <Heading message={`Welcome ${user.name} !`} />
          <Logout handleCredentials={handleCredentials} />
          {show ? (
            <section className="center-wrapper">
              <Input handleAdd={handleAdd} setMessage={setMessage} />
              <ShowButton message={'Cancel'} handleClick={handleShow} />
            </section>
          ) : (
            <ShowButton message={'Add new blog'} handleClick={handleShow} />
          )}
          <List
            setMessage={setMessage}
            loggedInState={user !== null}
            blogs={blogs}
            handleUpdate={handleUpdate}
          />
        </>
      )}
    </>
  )
}

export default App
