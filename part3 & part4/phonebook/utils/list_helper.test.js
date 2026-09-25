import { test, describe } from 'node:test'
import assert from 'node:assert'
import listHelper from '../utils/list_helper.js'

describe('most blogs', () => {
  const blogs = [
    { title: "React patterns", author: "Michael Chan", likes: 7 },
    { title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", likes: 5 },
    { title: "Canonical string reduction", author: "Edsger W. Dijkstra", likes: 12 }
  ]

  test('returns the author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      blogs: 2
    })
  })
})

describe('most likes', () => {
  const blogs = [
    { title: "React patterns", author: "Michael Chan", likes: 7 },
    { title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", likes: 5 },
    { title: "Canonical string reduction", author: "Edsger W. Dijkstra", likes: 12 }
  ]

  test('returns the author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })
})