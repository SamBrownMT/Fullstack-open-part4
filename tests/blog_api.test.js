const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = [
  {
    username: "foo",
    name: "bar",
    passwordHash: "baz"
  },
  {
    username: "Hamlet",
    name: "Shakespeare",
    passwordHash: "Stratford"
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await User.insertMany(initialUsers)
  await Blog.insertMany(initialBlogs)
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

test('post a blog with no likes defaults to 0', async () => {
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

test('post a blog with no title or url returns 400 status', 
  async () => {
  const noTitle = {
    author: "LancashireMan",
    url: "Buckshaw"
  }

  const noUrl = {
    title: "No Likey",
    author: "LancashireMan"
  }

  await api
    .post("/api/blogs")
    .send(noTitle)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  await api
    .post("/api/blogs")
    .send(noUrl)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('can get individual blog page', async () => {
  response = await api.get('/api/blogs')

  await api
    .get(`/api/blogs/${response.body[0].id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('deletes a blog', async () => {
  blogs = await api.get('/api/blogs') 

  await api
    .delete(`/api/blogs/${blogs.body[0].id}`)
    .expect(204)

  await api
    .get(`/api/blogs/${blogs.body[0].id}`)
    .expect(404)
})

test('updates a blog', async () => {
  updatedBlog = {
    title: "foo",
    author: "bar",
    url: "baz",
    likes:111
  }

  blogs = await api.get('/api/blogs')

  firstBlogId = blogs.body[0].id

  await api
    .put(`/api/blogs/${firstBlogId}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  newBlog = await api.get(`/api/blogs/${firstBlogId}`)

  expect(newBlog.body.likes).toEqual(111)
})

test("new blogs have associated user", async () => { 
  newBlog = {
    title: "New Blog",
    author: "I. M. New",
    url: "Newsville",
    likes: 3
  }
  await api
        .post('/api/blogs')
        .send(newBlog)

  let blogs = await api.get('/api/blogs')

  expect(blogs.body[2].user).toBeDefined()
})

test('the new blog displays user\'s username', async () => {
  newBlog = {
      title: "New Blog",
      author: "I. M. New",
      url: "Newsville",
      likes: 3
  }
  await api
        .post('/api/blogs')
        .send(newBlog)

  let blogs = await api.get('/api/blogs')

  expect(blogs.body[2].user.username).toBeDefined()
}) 


afterAll(() => {
  mongoose.connection.close()
})