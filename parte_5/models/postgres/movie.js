import postgres from 'postgres'

const DB_PORT = process.env.NODE_GUIDE_DB_PORT ?? 2079

const sql = postgres({
  host: 'localhost',
  port: DB_PORT,
  database: 'dbmovies',
  username: 'postgres',
  password: 'norisama'
})

// ======================
// QUERIES
// ======================

const getAllQuery = async () => {
  return await sql`
    SELECT
      m.id,
      m.title,
      m.year,
      m.director,
      m.duration,
      m.poster,
      m.rate,
      COALESCE(
        JSON_AGG(g.genre) FILTER (WHERE g.genre IS NOT NULL),
        '[]'
      ) AS genres
    FROM public.movies AS m
    LEFT JOIN public."movie-genres" AS mg ON m.id = mg.movie_id
    LEFT JOIN public.genres AS g ON mg.genre_id = g.id
    GROUP BY m.id
    ORDER BY m.id;
  `
}

const getAllwithGenreQuery = async (genreLowerCaseParam) => {
  return await sql`
    SELECT
      m.id,
      m.title,
      m.year,
      m.director,
      m.duration,
      m.poster,
      m.rate,
      COALESCE(
        JSON_AGG(g.genre) FILTER (WHERE g.genre IS NOT NULL),
        '[]'
      ) AS genres
    FROM public.movies AS m
    LEFT JOIN public."movie-genres" AS mg ON m.id = mg.movie_id
    LEFT JOIN public.genres AS g ON mg.genre_id = g.id
    WHERE m.id IN (
      SELECT m_sub.id
      FROM public.movies AS m_sub
      LEFT JOIN public."movie-genres" AS mg_sub ON m_sub.id = mg_sub.movie_id
      LEFT JOIN public.genres AS g_sub ON mg_sub.genre_id = g_sub.id
      WHERE LOWER(g_sub.genre) = ${genreLowerCaseParam}
    )
    GROUP BY m.id
    ORDER BY m.id;
  `
}

const getByIDQuery = async (idParam) => {
  return await sql`
    SELECT
      m.id,
      m.title,
      m.year,
      m.director,
      m.duration,
      m.poster,
      m.rate,
      COALESCE(
        JSON_AGG(g.genre) FILTER (WHERE g.genre IS NOT NULL),
        '[]'
      ) AS genres
    FROM public.movies AS m
    LEFT JOIN public."movie-genres" AS mg ON m.id = mg.movie_id
    LEFT JOIN public.genres AS g ON mg.genre_id = g.id
    WHERE m.id = ${idParam}
    GROUP BY m.id
    ORDER BY m.id;
  `
}

const createQuery = async ({ inputParams }) => {
  const { title, year, director, duration, poster, rate } = inputParams

  if (!title || !year || !director || !duration || !poster) {
    throw new Error('Missing required movie fields')
  }

  const [newMovie] = rate !== undefined
    ? await sql`
      INSERT INTO public.movies (
        title, year, director, duration, poster, rate
      ) VALUES (
        ${title}, ${year}, ${director}, ${duration}, ${poster}, ${rate}
      )
      RETURNING *;
    `
    : await sql`
      INSERT INTO public.movies (
        title, year, director, duration, poster
      ) VALUES (
        ${title}, ${year}, ${director}, ${duration}, ${poster}
      )
      RETURNING *;
    `

  return newMovie
}

const updateQuery = async ({ idParam, inputParams }) => {
  const fields = Object.entries(inputParams)
    .filter(([_, value]) => value !== undefined)

  if (fields.length === 0) {
    throw new Error('No valid fields provided for update.')
  }

  const setFragments = fields.map(([key], index) => {
    return `${key} = $${index + 1}`
  }).join(', ')

  const values = fields.map(([_, value]) => value)

  const [updatedMovie] = await sql.unsafe(`
    UPDATE public.movies
    SET ${setFragments}
    WHERE id = $${fields.length + 1}
    RETURNING *;
  `, [...values, idParam])

  return updatedMovie
}

const deleteQuery = async ({ idParam }) => {
  try {
    // Borra géneros relacionados
    await sql`
      DELETE FROM public."movie-genres"
      WHERE movie_id = ${idParam};
    `

    // Borra la película
    const result = await sql`
      DELETE FROM public.movies
      WHERE id = ${idParam}
      RETURNING *;
    `

    if (result.length === 0) {
      throw new Error('Movie not found')
    }

    return result[0]
  } catch (error) {
    throw new Error(`Error deleting movie: ${error.message}`)
  }
}

// ======================
// MODEL
// ======================

export class MovieModel {
  getAll = async ({ genre }) => {
    if (genre) {
      return getAllwithGenreQuery(genre.toLowerCase())
    }
    return getAllQuery()
  }

  getById = async ({ id }) => {
    return getByIDQuery(id)
  }

  create = async ({ input }) => {
    try {
      return await createQuery({ inputParams: input })
    } catch (error) {
      throw new Error(`Error creating movie: ${error.message}`)
    }
  }

  update = async ({ id, input }) => {
    try {
      const updated = await updateQuery({ idParam: id, inputParams: input })
      if (!updated) throw new Error('Movie not found')
      return updated
    } catch (error) {
      throw new Error(`Error updating movie: ${error.message}`)
    }
  }

  delete = async ({ id }) => {
    try {
      const deleted = await deleteQuery({ idParam: id })
      return deleted
    } catch (error) {
      throw new Error(`Error deleting movie: ${error.message}`)
    }
  }
}
