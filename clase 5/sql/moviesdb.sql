-- Creacion BD
DROP DATABASE IF EXISTS moviesdb;
CREATE DATABASE moviesdb;

-- Usamos la BD
USE moviesdb;

-- Crear tabla movies
CREATE TABLE movies (
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    director VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    poster TEXT,
    rate DECIMAL(2,1) UNSIGNED NOT NULL
);

CREATE TABLE gender (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE movie_genres (
	movie_id BINARY(16) REFERENCES movie(id),
    genre_id INT REFERENCES genres(id),
    PRIMARY KEY (movie_id, genre_id)
);

-- Insertar datos

INSERT INTO gender (name) VALUES
('Drama'),
('Action'),
('Crime'),
('Adventure'),
('Sci-Fi'),
('Romance');

INSERT INTO movies (id, title, year, director, duration, poster, rate) VALUES
(UUID_TO_BIN(UUID()), 'Inception', 1994, 'Christopher Nolan', 148, 'https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg', 8.8),
(UUID_TO_BIN(UUID()), 'The Shawshank Redemption', 1994, 'Frank Darabont', 142, 'https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp', 9.3),
(UUID_TO_BIN(UUID()), 'The Dark Knight', 2008, 'Christopher Nolan', 152, 'https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg', 9.0),
(UUID_TO_BIN(UUID()), 'Pulp Fiction', 1994, 'Quentin Tarantino', 154, 'https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg', 8.9),
(UUID_TO_BIN(UUID()), 'Forrest Gump', 1994, 'Robert Zemeckis', 142, 'https://i.ebayimg.com/images/g/qR8AAOSwkvRZzuMD/s-l1600.jpg', 8.8),
(UUID_TO_BIN(UUID()), 'Gladiator', 2000, 'Ridley Scott', 155, 'https://img.fruugo.com/product/0/60/14417600_max.jpg', 8.5),
(UUID_TO_BIN(UUID()), 'The Matrix', 1999, 'Lana Wachowski', 136, 'https://i.ebayimg.com/images/g/QFQAAOSwAQpfjaA6/s-l1200.jpg', 8.7),
(UUID_TO_BIN(UUID()), 'Interstellar', 2014, 'Christopher Nolan', 169, 'https://m.media-amazon.com/images/I/91obuWzA3XL._AC_UF1000,1000_QL80_.jpg', 8.6),
(UUID_TO_BIN(UUID()), 'The Lion King', 1994, 'Roger Allers, Rob Minkoff', 88, 'https://m.media-amazon.com/images/I/81BMmrwSFOL._AC_UF1000,1000_QL80_.jpg', 8.5);


-- GENERAR GENEROS

-- The Shawshank Redemption → Drama
INSERT INTO movie_genres (movie_id, genre_id)
VALUES ((SELECT id FROM movies WHERE title = 'The Shawshank Redemption'), 1);

-- The Dark Knight → Action, Crime, Drama
INSERT INTO movie_genres (movie_id, genre_id)
VALUES 
((SELECT id FROM movies WHERE title = 'The Dark Knight'), 2),
((SELECT id FROM movies WHERE title = 'The Dark Knight'), 3),
((SELECT id FROM movies WHERE title = 'The Dark Knight'), 1);

-- Pulp Fiction → Crime, Drama
INSERT INTO movie_genres (movie_id, genre_id)
VALUES 
((SELECT id FROM movies WHERE title = 'Pulp Fiction'), 3),
((SELECT id FROM movies WHERE title = 'Pulp Fiction'), 1);

-- Forrest Gump → Drama, Romance
INSERT INTO movie_genres (movie_id, genre_id)
VALUES 
((SELECT id FROM movies WHERE title = 'Forrest Gump'), 1),
((SELECT id FROM movies WHERE title = 'Forrest Gump'), 6);

-- Gladiator → Action, Adventure, Drama
INSERT INTO movie_genres (movie_id, genre_id)
VALUES 
((SELECT id FROM movies WHERE title = 'Gladiator'), 2),
((SELECT id FROM movies WHERE title = 'Gladiator'), 4),
((SELECT id FROM movies WHERE title = 'Gladiator'), 1);

-- The Matrix → Action, Sci-Fi
INSERT INTO movie_genres (movie_id, genre_id)
VALUES 
((SELECT id FROM movies WHERE title = 'The Matrix'), 2),
((SELECT id FROM movies WHERE title = 'The Matrix'), 5);

-- Interstellar → Adventure, Drama, Sci-Fi
INSERT INTO movie_genres (movie_id, genre_id)
VALUES 
((SELECT id FROM movies WHERE title = 'Interstellar'), 4),
((SELECT id FROM movies WHERE title = 'Interstellar'), 1),
((SELECT id FROM movies WHERE title = 'Interstellar'), 5);

-- The Lion King → Animation (no existe), Adventure, Drama
INSERT INTO movie_genres (movie_id, genre_id)
VALUES 
((SELECT id FROM movies WHERE title = 'The Lion King'), 4),
((SELECT id FROM movies WHERE title = 'The Lion King'), 1);


SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movies;