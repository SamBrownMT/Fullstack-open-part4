const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require("../models/user")

const api = supertest(app)

beforeEach(async () => {
	await User.deleteMany({})
	password = "baz"
	const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
	User.insertMany([{
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

afterAll(() => {
  mongoose.connection.close()
})