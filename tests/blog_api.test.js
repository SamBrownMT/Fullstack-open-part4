const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: "foo",
    author: "bar",
    url: "baz",
    likes:420
  },
  {
    title: "Hamlet",
    author: "Shakespeare",
    url: "Stratford",
    likes: 1601
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs')

	expect(response.body).toHaveLength(initialBlogs.length)
})

test('the blogs each contain an id identifier', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('post a blog adds to database', async () => {
  const newBlog = {
    title: "Chef",
    author: "Jon Favreau",
    url: "Hollywood",
    likes: 2
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const urls = response.body.map(r => r.url)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(urls).toContain('Hollywood')
})

test('post a blog adds to database', async () => {
  const newBlog = {
    title: "No Likey",
    author: "LancashireMan",
    url: "Buckshaw"
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const likes = response.body.map(r => r.likes)

  expect(likes).toContain(0)
})

afterAll(() => {
  mongoose.connection.close()
})