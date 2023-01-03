import PropTypes from 'prop-types'

export const ShowButton = ({ message, handleClick }) => {

  return(
    <>
      <button onClick={() => handleClick()} className='center'>
        {message}
      </button>
    </>
  )

}

ShowButton.propTypes = {
  message: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
}
