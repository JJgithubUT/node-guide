import postgres from 'postgres'

const DB_PORT = process.env.NODE_GUIDE_DB_PORT ?? 2079

const sql = postgres({
  host: 'localhost',
  port: DB_PORT,
  database: 'dbmovies',
  username: 'postgres',
  password: 'norisama'
})

const result = await sql`SELECT id, title, year, director, duration, poster, rate FROM public.movies;`
console.log(result)
