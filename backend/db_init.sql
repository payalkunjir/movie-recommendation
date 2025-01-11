
CREATE DATABASE movies_db;

USE movies_db;

CREATE TABLE movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(50) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  mood VARCHAR(50) NOT NULL
);

INSERT INTO movies (title, genre, duration, mood)
VALUES
('The Grand Budapest Hotel', 'Comedy', 'Medium', 'Happy'),
('Inception', 'Sci-Fi', 'Long', 'Adventurous'),
('The Conjuring', 'Horror', 'Medium', 'Excited');
