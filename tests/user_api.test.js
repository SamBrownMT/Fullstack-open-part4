const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
	await User.deleteMany({})
})

test("posts a user", () => {
	newUser = {
		username: "foo",
		name: "bar",
		password: "baz"
	}

	api
		.post("/api/users")
		.send(newUser)
		.expect(201)
})