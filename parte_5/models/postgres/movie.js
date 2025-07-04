import postgres from 'postgres'

const DB_PORT = process.env.NODE_GUIDE_DB_PORT ?? 2079

const sql = postgres({
  host: 'localhost',
  port: DB_PORT,
  database: 'dbmovies',
  username: 'postgres',
  password: 'norisama'
})

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()
      return await sql`SELECT m.id, m.title, m.year, m.director, m.duration, m.poster, m.rate, COALESCE( JSON_AGG(g.genre) FILTER (WHERE g.genre IS NOT NULL), '[]' ) AS genres FROM public.movies AS m LEFT JOIN public."movie-genres" AS mg ON m.id = mg.movie_id LEFT JOIN public.genres AS g ON mg.genre_id = g.id WHERE LOWER(g.genre) = ${lowerCaseGenre} GROUP BY m.id ORDER BY m.id;`
    }
    return await sql`SELECT m.id, m.title, m.year, m.director, m.duration, m.poster, m.rate, COALESCE(   JSON_AGG(g.genre) FILTER (WHERE g.genre IS NOT NULL), '[]'   ) AS genres FROM public.movies AS m LEFT JOIN public."movie-genres" AS mg ON m.id = mg.movie_id LEFT JOIN public.genres AS g ON mg.genre_id = g.id GROUP BY m.id ORDER BY m.id;`
  }

  static async getById ({ id }) {
    const movie = await sql`SELECT id, title, year, director, duration, poster, rate FROM public.movies WHERE movies.id = ${id};`
    return movie
    /// ERRores fatales aquí
  }

  static async create ({ input }) {
  }

  static async delete ({ id }) {
  }

  static async update ({ id, input }) {
  }
}
