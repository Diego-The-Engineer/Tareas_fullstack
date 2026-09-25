import _ from 'lodash'

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  return blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  
  const authors = _.countBy(blogs, 'author')
  const topAuthor = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b)
  
  return { 
    author: topAuthor, 
    blogs: authors[topAuthor] 
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  
  const grouped = _.groupBy(blogs, 'author')
  const authors = Object.keys(grouped).map(author => ({
    author,
    likes: grouped[author].reduce((sum, blog) => sum + blog.likes, 0)
  }))
  
  return _.maxBy(authors, 'likes')
}

export default { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }