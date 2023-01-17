const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likesReducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(likesReducer, 0)
}

module.exports = {
  dummy,
  totalLikes
}