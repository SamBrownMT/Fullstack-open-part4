const listHelper = require('../utils/list_helper')

const blogs1 = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const blogs2 = [
  { _id:    "63c53787a72dabb5d5cf4116",
    title:  "one",
    author: "Metallica",
    url:    "Metal",
    likes:  1,
    __v:    0
  },
  { _id:    "63c53787a72dabb5d5cf4117",
    title:  "two",
    author: "Bill Withers",
    url:    "Soul",
    likes:  2,
    __v:    0
  },
  { _id:    "63c53787a72dabb5d5cf4118",
    title:  "three",
    author: "Lynyrd Skynyrd",
    url:    "Rock",
    likes:  3,
    __v:    0
  }
  ]

describe('dummy tests', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('Total likes tests', () => {
  test('totalLikes returns six', () => {
    const result = listHelper.totalLikes(blogs2)
    expect(result).toBe(6)
  })

  test('totalLikes returns thirty six', () => {
    const result = listHelper.totalLikes(blogs1)
    expect(result).toBe(36)
  })
})

describe("Favourite blogs tests", () => {
  test('favouriteBlogs returns Canonical string reduction', 
  () => {
    const result = listHelper.favouriteBlog(blogs1)
    expect(result).toEqual({
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
    })
  })

  test("favouriteBlog returns three", () => {
    const result = listHelper.favouriteBlog(blogs2)
    expect(result).toEqual({
      title: "three",
      author: "Lynyrd Skynyrd",
      likes: 3
    })
  })
})
