const loginRouter = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")

loginRouter.post("/", async (request, response) => {
	const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

	response.status(200).json() 
})

module.exports = loginRouter