import { Pool } from 'pg';

import bcrypt from 'bcrypt';

export class PostgresAdminStore {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async getAdmin() {
    const getAdmins = `
        SELECT
          *
        FROM admins.admin;
    `;

    try {
      const result = await this.pool.query(getAdmins);
      return result.rows; // assuming you want to return the first row of the result
    } catch (error) {
      // handle error appropriately
      console.error('Error querying admin password:', error);
      throw error;
    }
  }

  async loginAdmin(adminCode: string) {
    try {
      const adminList = await this.getAdmin();
      if (!adminList || adminList.length === 0) {
        throw new Error('Admins not found, check DB');
      } else {
        const matches = await Promise.all(
          adminList.map(async (admin) => {
            const match = await bcrypt.compare(adminCode, admin.admin_code);
            if (match) {
              return {
                name: admin.name,
              };
            }
          })
        );
        const validAdmin = matches.find((match) => match !== undefined);
        if (validAdmin) {
          return validAdmin;
        } else {
          throw new Error('Invalid admin code');
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error while fetching user by email.');
    }
  }
}
