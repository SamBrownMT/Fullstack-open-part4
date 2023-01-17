var _ = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likesReducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(likesReducer, 0)
}

const favouriteBlog = (blogs) => {
  blogs.sort((a,b) => b.likes - a.likes)
  return {
    title: blogs[0].title,
    author: blogs[0].author,
    likes: blogs[0].likes
  }
}

const mostBlogs = (blogs) => {
  const authors = _.map(blogs, "author")
  const blogsByAuthors = _.countBy(authors)
  const prominentAuthor = _.maxBy(_.keys(blogsByAuthors),
    (o) => { return blogsByAuthors[o] })
  const numberOfBlogs = _.max(_.valuesIn(blogsByAuthors))
  return {
    author: prominentAuthor,
    blogs: numberOfBlogs
  }
}

const mostLikes = (blogs) => {
  const authors = _.map(blogs, "author")
  const authorsWithLikes = {}
  authors.forEach((author) => {
    authorsWithLikes[author] = 0
  })
  blogs.forEach((blog) => {
    currentAuthor = blog.author
    authorsWithLikes[currentAuthor] += blog.likes
  })
  const mostLikedAuthor = _.maxBy(_.keys(authorsWithLikes),
    (o) => { return authorsWithLikes[o] })
  return {
    author: mostLikedAuthor,
    likes: authorsWithLikes[mostLikedAuthor]
  }
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}