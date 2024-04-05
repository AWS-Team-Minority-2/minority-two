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

//  We only support one type of notification, update this when more types notiifcations become supported
type NotifcationType = 'processed';
export interface NotificationBase {
  imageUrl: string;
  name: string;
  type: NotifcationType;
}

export interface UnreadNotification extends NotificationBase {
  receivedAt: string | Date;
}

export const addUserNotificationQuery = `
UPDATE users.user
SET notifications = $1
WHERE sid = $2;
`;
