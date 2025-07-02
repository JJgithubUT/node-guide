import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils.js'

const movies = readJSON('../parte_4/movies.json')

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }

    return movies
  }

  static async getByID ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async create (inputData) {
    const newMovie = {
      id: randomUUID(), // uuid v4
      ...inputData
    }
    movies.push(newMovie)
  }

  static async update ({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    }

    return movies[movieIndex]
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    movies.splice(movieIndex, 1)
    return true
  }
}
