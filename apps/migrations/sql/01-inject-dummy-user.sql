-- Migration for inserting a demo user
INSERT INTO users.user (
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    address,
    city,
    state,
    zipCode
) VALUES (
    'Demo',
    'User',
    '123-456-7890',
    'demo@example.com',
    '$2b$10$G2SJ9QZTCOIh81hyjHZWx.9r4ZScO1julfwab5mZy4m0vfeIFjekS',
    '123 Demo St',
    'DC',
    'Washington',
    '20059'
);
