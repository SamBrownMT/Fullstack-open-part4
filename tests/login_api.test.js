const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require("../models/user")
const jwt = require('jsonwebtoken')

const api = supertest(app)

beforeEach(async () => {
	await User.deleteMany({})
	const saltRounds = 10
  const passwordHash = await bcrypt.hash("baz", saltRounds)
	await User.insertMany([{
		username: "foo",
		name: "bar",
		passwordHash: passwordHash
	}])
})

test('for correct username and password returns status 200',
	async () => {
	await api
					.post('/api/login')
					.send({username: "foo",password: "baz"})
					.expect(200)
})

test('for incorrect username and password returns status 401',
	async () => {
	await api
					.post('/api/login')
					.send({username: "Not",password: "Correct"})
					.expect(401)
})

test('post response includes information', async () => {
	const response = await api
										.post('/api/login')
										.send({username: "foo",password: "baz"})
	expect(response.body[0]).not.toBe(null)
})

test('post response includes correct token', async () => {
	const user = await User.findOne({ username: "foo" })
	const token = jwt.sign({username:user.username,id:user._id}, 
		process.env.SECRET)

	const response = await api
										.post('/api/login')
										.send({username: "foo",password: "baz"})
	expect(response.body.token.substr(0,4)).toBe("eyJh")
})

afterAll(() => {
  mongoose.connection.close()
})