import { PostgresUserStore } from '../stores/PostgresUserStore';
import { User } from '../controllers/User';

export interface UserLoaderClass {
  upsert: (user: User) => Promise<any[]>; // Include the parameter in the interface
  fetchUsers: () => Promise<any[]>;
}

interface Reponse {
  message: string;
}

export class UserLoader implements UserLoaderClass {
  private store: PostgresUserStore;

  constructor(store: PostgresUserStore) {
    this.store = store;
  }

  upsert = async (user: User): Promise<any> => {
    // Include the parameter in the method
    try {
      return this.store.upsertNewUser(user);
    } catch (error) {
      console.error('Error uploading user data', error);
      return [];
    }
  };

  fetchUsers = async (): Promise<any[]> => {
    try {
      const users = await this.store.getUsers();
      return users;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return [];
    }
  };
}
