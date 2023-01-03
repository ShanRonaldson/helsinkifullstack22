import { Row } from './Row'
import { TableHeading } from './TableHeading'
import PropTypes from 'prop-types'

export const List = ({ blogs, handleUpdate, loggedInState, setMessage }) => {
  return(
    <>
      {blogs.length < 0 ?
        <>
          <h2>Blog List</h2>
          <table>
            <TableHeading/>
          </table>

        </>
        :
        <>
          <h2>Blog List</h2>
          <table>
            <TableHeading/>
            <tbody>
              {blogs.map((blog, id) => (
                <Row key={id} id={id} blog={blog} handleUpdate={handleUpdate} loggedInState={loggedInState} setMessage={setMessage}/>
              ))}
            </tbody>
          </table>
        </>
      }
    </>
  )
}

List.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  loggedInState: PropTypes.bool
}
