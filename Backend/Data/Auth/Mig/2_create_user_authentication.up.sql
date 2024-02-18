CREATE TABLE user_auth_data (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    email_address VARCHAR(255) UNIQUE,
    phone_number VARCHAR(50) UNIQUE,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
            