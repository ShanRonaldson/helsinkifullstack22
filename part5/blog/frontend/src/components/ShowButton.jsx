import PropTypes from 'prop-types'

export const ShowButton = ({ message, handleClick, testData }) => {

  return(
    <>
      <button onClick={() => handleClick()} className='center' data={testData}>
        {message}
      </button>
    </>
  )

}

ShowButton.propTypes = {
  message: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  testData: PropTypes.string.isRequired
}
