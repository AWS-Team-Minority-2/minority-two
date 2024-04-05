import { PostgresUserStore } from '../stores/PostgresUserStore';
import { NotificationBase, User, UserDetails } from '@min-two/user-iso';
import { QueryResult } from 'pg';

export interface UserLoaderClass {
  resgister: (user: User) => Promise<{
    message: string;
  }>;
}

export class UserLoader implements UserLoaderClass {
  private store: PostgresUserStore;

  constructor(store: PostgresUserStore) {
    this.store = store;
  }

  resgister = async (user: User): Promise<any> => {
    try {
      return await this.store.upsertNewUser(user);
    } catch (error) {
      throw new Error('Failed to register user');
    }
  };

  checkId = async (email: string): Promise<any> => {
    try {
      return await this.store.fetchUserByEmail(email);
    } catch (error) {
      throw new Error('Failed to get email');
    }
  };

  login = async (details: UserDetails): Promise<any> => {
    try {
      return await this.store.loginUser(details);
    } catch (error) {
      throw new Error('Failed to get email');
    }
  };

  uploadNotification = async (
    notification: NotificationBase,
    userId: string
  ): Promise<any> => {
    try {
      return await this.store.uploadUserNotification(notification, userId);
    } catch (error) {
      throw new Error('Failed to upload notification');
    }
  };
}
