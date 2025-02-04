const logger = (req, res, next) => {
  console.log(req.url) // URL
  console.log(req.headers) // header data
  console.log(req.method) // Type of method used
  console.log(Date()) // date and time
  next() // Move to next task
}

export default logger
