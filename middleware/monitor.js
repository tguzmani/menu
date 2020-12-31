exports.monitor = (req, res, next) => {
  console.log("\nMonitor here ;)")

  const { body, params, query } = req

  console.log(`endPoint: ${req.originalUrl}`)

  console.log("body is:")
  console.table(body)

  console.log("body is:")
  console.log(body)

  console.log("params are:")
  console.table(params)

  console.log("query is:")
  console.table(query)

  next()
}
