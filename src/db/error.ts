import db from '.'

// TODO: get error messages to show in alert
const getError = (err) =>
  err.response && err.response.data && err.response.data.message
    ? err.response.data.message
    : err.message

const onError = async (err, req, res, next) => {
  await db.disconnect()
  res.status(500).send({ message: err.toString() })
}
export { getError, onError }
