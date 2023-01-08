import PropTypes from 'prop-types'

export const Logout = ({ handleCredentials }) => {

  const handleLogout = () => {
    handleCredentials('data')
  }

  return(
    <>
      <button data='logout-button' type="submit" onClick={() => handleLogout()}>Logout</button>
    </>
  )
}

Logout.propTypes = {
  handleCredentials: PropTypes.func.isRequired
}
