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


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}