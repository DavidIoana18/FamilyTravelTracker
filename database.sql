CREATE TABLE users(
id SERIAL PRIMARY KEY,             -- SERIAL is a pseudo-type that automatically increments the value of the field --
name VARCHAR(15) UNIQUE NOT NULL,  -- UNIQUE ensures that the value in the field is unique --
color VARCHAR(15)                  -- VARCHAR is a variable-length string with a maximum length of 15 characters --
);

create table countries(
id SERIAL PRIMARY KEY,
country_code CHAR(2) UNIQUE NOT NULL, -- CHAR is a fixed-length string with a length of 2 characters --
country_name VARCHAR(100)
);

CREATE TABLE visited_countries(
id SERIAL PRIMARY KEY,
country_code CHAR(2) NOT NULL,            -- NOT NULL ensures that the field cannot be empty --
user_id INTEGER REFERENCES users(id)      -- REFERENCES creates a foreign key constraint --
ALTER TABLE visited_countries ADD CONSTRAINT unique_user_country UNIQUE (user_id, country_code); -- ADD CONSTRAINT creates a unique constraint on the combination of user_id and country_code --
); 

INSERT INTO users (name, color)
VALUES ('Ioana', 'teal'), ('Robert', 'powderblue');

INSERT INTO visited_countries (country_code, user_id)
VALUES ('FR', 1), ('GB', 1), ('CA', 2), ('FR', 2 );

SELECT *
FROM visited_countries
JOIN users              -- JOIN is used to combine data from multiple tables based on a related column --
ON users.id = user_id;  -- ON specifies the condition for the join --