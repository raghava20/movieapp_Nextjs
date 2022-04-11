CREATE TABLE IF NOT EXISTS movie(
    id INTEGER PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    "description" TEXT,
    review INT NOT NULL,
    director VARCHAR(100) NOT NULL,
    trailer VARCHAR(100)
);

INSERT INTO movie (id, title, description, review, director , trailer)
VALUES (
    1, 
    'The Batman',
    'Batman ventures into Gotham Citys underworld when a sadistic killer leaves behind a trail of cryptic clues. As the evidence begins to lead closer to home and the scale of the perpetrators plans become clear, he must forge new relationships, unmask the culprit and bring justice to the abuse of power and corruption that has long plagued the metropolis.',
    8,
    'Matt Reeves',
    'https://www.youtube.com/watch?v=mqqft2x_Aa4'
);