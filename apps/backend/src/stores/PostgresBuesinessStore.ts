import { Pool } from 'pg';
import { GetLatLngByAddress } from '@geocoder-free/google';

export class PostgresBusinessStore {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }
  getBusinessQuery = `SELECT * FROM stores.store`;
  async getStores() {
    try {
      const results = await this.pool.query(this.getBusinessQuery);
      const businessList = results.rows;

      const updatedBusinessList = await Promise.all(
        businessList.map(async (business) => {
          if (!business.address) {
            return { ...business, ['lat']: null, ['long']: null };
          }
          const address = business.address + ' ' + business.city;
          const logLat = await GetLatLngByAddress(address);
          if (!logLat) {
            return { ...business, ['lat']: null, ['long']: null };
          } else {
            return { ...business, ['lat']: logLat[0], ['long']: logLat[1] };
          }
        })
      );

      return updatedBusinessList;
    } catch (error) {
      // Handle errors
      console.error(error);
      throw new Error('Error getting business list');
      return []; // or throw error as needed
    }
  }
}
