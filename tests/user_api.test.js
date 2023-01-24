const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
  {
    username: "foo",
    name: "bar",
    password: "baz"
  },
  {
    username: "Hamlet",
    name: "Shakespeare",
    password: "Stratford"
  }
]

beforeEach(async () => {
	await User.deleteMany({})
	await api
		.post("/api/users")
		.send(initialUsers[0])
	await api
		.post("/api/users")
		.send(initialUsers[1])
})

test("posts a user", async () => {
	newUser = {
		username: "foo",
		name: "bar",
		password: "baz"
	}

	await api
		.post("/api/users")
		.send(newUser)
		.expect(201)
})

test("users are returned as json", async () => {
	await api
		.get("/api/users")
		.expect('Content-Type', /application\/json/)
})

test("users are returned without passwords", async () => {
	response = await api.get("/api/users")
	expect(response.body[0].password).not.toBeDefined
	expect(response.body[0].passwordHash).not.toBeDefined
	expect(response.body[0].username).toContain("foo")
})

test("posts a user with too short a username", async () => {
	newUser = {
		username: "No",
		name: "Nein",
		password: "Allowed"
	}

	await api
		.post("/api/users")
		.send(newUser)
		.expect(400)
})