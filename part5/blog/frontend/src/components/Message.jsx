import PropTypes from 'prop-types'

export const Message = ({ message, type }) => {
  return (
    <>
      <div className={`notification ${type}`}>{message}</div>
    </>
  )
}

Message.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
}
