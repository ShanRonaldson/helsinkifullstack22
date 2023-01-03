import PropTypes from 'prop-types'

export const Heading = ({ message }) => {


  return(
    <h1>
      {message}
    </h1>
  )
}

Heading.propTypes = {
  message: PropTypes.string
}
