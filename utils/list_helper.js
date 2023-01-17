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


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}