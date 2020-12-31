exports.__ = (string, parameters = {}) => {
  const keys = Object.keys(parameters)
  keys.forEach(key => (string = string.replace(`:${key}`, parameters[key])))
  console.log(strig)
}
