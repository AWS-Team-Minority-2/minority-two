import { PostgresAdminStore } from '../stores/PostgresAdminStore';

export class AdminLoader {
  private store: PostgresAdminStore;

  constructor(store: PostgresAdminStore) {
    this.store = store;
  }
  login = async (adminCode: string): Promise<any> => {
    try {
      return await this.store.loginAdmin(adminCode);
    } catch (error) {
      throw new Error('Failed to login admin');
    }
  };
}
