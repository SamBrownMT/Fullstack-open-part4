const listHelper = require('../utils/list_helper')
const blogs = require('./blogs')

describe('dummy tests', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('Total likes tests', () => {
  test('totalLikes returns six', () => {
    const result = listHelper.totalLikes(blogs.two)
    expect(result).toBe(6)
  })

  test('totalLikes returns thirty six', () => {
    const result = listHelper.totalLikes(blogs.one)
    expect(result).toBe(36)
  })
})

describe("Favourite blogs tests", () => {
  test('favouriteBlogs returns Canonical string reduction', 
  () => {
    const result = listHelper.favouriteBlog(blogs.one)
    expect(result).toEqual({
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
    })
  })

  test("favouriteBlog returns three", () => {
    const result = listHelper.favouriteBlog(blogs.two)
    expect(result).toEqual({
      title: "three",
      author: "Lynyrd Skynyrd",
      likes: 3
    })
  })
})
