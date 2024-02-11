export type UserDetails = {
  email: string;
  password: string;
};

export const registerUserQuery = `
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
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
`;

export const fetchOneByEmailQuery = `SELECT *
FROM users.user
WHERE email = $1;`;

export * from './context/auth';
