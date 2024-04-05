import { Pool } from 'pg';
import {
  registerUserQuery,
  User,
  fetchOneByEmailQuery,
  UserDetails,
  NotificationBase,
  addUserNotificationQuery,
  UnreadNotification,
} from '@min-two/user-iso';
import bcrypt from 'bcrypt';

export class PostgresUserStore {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async upsertNewUser(user: User) {
    try {
      const salt = await bcrypt.genSalt();
      const hashed = await bcrypt.hash(user.password, salt);
      const values = [
        user.firstName,
        user.lastName,
        user.phoneNumber,
        user.email,
        hashed,
        user.address,
        user.city,
        user.state,
        user.zipCode,
      ];
      return await this.pool.query(registerUserQuery, values);
    } catch (error) {
      console.log(error);
      throw new Error('Error while adding user to the database.');
    }
  }

  async uploadUserNotification(notification: NotificationBase, userId: string) {
    try {
      const parsedNotifcation: UnreadNotification = {
        imageUrl: notification.imageUrl,
        name: notification.name,
        type: notification.type,
        receivedAt: new Date(),
      };

      const values = [parsedNotifcation, userId];
      return await this.pool.query(addUserNotificationQuery, values);
    } catch (error) {
      console.log(error);
      throw new Error('Error while adding notification to the database.');
    }
  }

  async fetchUserByEmail(email: string) {
    try {
      const result = await this.pool.query(fetchOneByEmailQuery, [email]);
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error while fetching user by email.');
    }
  }

  async loginUser(details: UserDetails) {
    try {
      const userFound = await this.fetchUserByEmail(details.email);
      if (!userFound) {
        return 'User not Found';
      } else {
        const isMatch = await bcrypt.compare(
          details.password,
          userFound.password
        );
        if (isMatch) {
          return {
            id: userFound.id,
            userMetadata: {
              address: {
                city: userFound.city,
                state: userFound.state,
                street: userFound.address,
                zipcode: userFound.zipcode,
              },
              email: userFound.email,
              firstname: userFound.firstname,
              lastname: userFound.lastname,
              phonenumber: userFound.phonenumber,
            },
          };
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error while fetching user by email.');
    }
  }
}
