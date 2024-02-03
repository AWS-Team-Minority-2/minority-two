import { resgisterUser } from './../controllers/User';
import { PostgresUserStore } from '../stores/PostgresUserStore';
import { User } from '@min-two/user-iso';
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
}
