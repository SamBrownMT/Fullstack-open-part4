const loginRouter = require("express").Router()

loginRouter.post("/", async (request, response) => {
	response.status(200).json() 
})

module.exports = loginRouter