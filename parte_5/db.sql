


-- Asegúrate de tener instalada la extensión de UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de géneros (sin cambios)
CREATE TABLE public.genres
(
    id smallint NOT NULL GENERATED ALWAYS AS IDENTITY,
    genre character varying(255) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.genres
    OWNER to postgres;


-- Tabla de películas (id como UUID)
CREATE TABLE public.movies
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    title character varying(255) NOT NULL UNIQUE,
    year numeric(4, 0) NOT NULL,
    director character varying(255) NOT NULL,
    duration numeric(6, 0) NOT NULL,
    poster character varying(255) NOT NULL,
    rate numeric(3, 1),
    PRIMARY KEY (id)
);
ALTER TABLE IF EXISTS public.movies
    OWNER to postgres;


-- Tabla intermedia película–género (ajustada a UUID)
CREATE TABLE public."movie-genres"
(
    movie_id uuid NOT NULL,
    genre_id smallint NOT NULL,
    FOREIGN KEY (movie_id)
        REFERENCES public.movies (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    FOREIGN KEY (genre_id)
        REFERENCES public.genres (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);
ALTER TABLE IF EXISTS public."movie-genres"
    OWNER to postgres;

ALTER TABLE IF EXISTS public."movie-genres"
    ADD UNIQUE (movie_id, genre_id)
    INCLUDE (movie_id, genre_id);

ALTER TABLE IF EXISTS public.movies
    ALTER COLUMN rate SET DEFAULT 0;