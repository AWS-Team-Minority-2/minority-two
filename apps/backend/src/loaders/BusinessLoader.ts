import { PostgresBusinessStore } from '../stores/PostgresBuesinessStore';

export class BusinessLoader {
  private store: PostgresBusinessStore;

  constructor(store: PostgresBusinessStore) {
    this.store = store;
  }

  getStores = async (): Promise<any> => {
    try {
      return await this.store.getStores();
    } catch (error) {
      throw new Error('Failed to get stores');
    }
  };
}
