import { Pool } from 'pg';
import { registerUserQuery, User } from '@min-two/user-iso';
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
}
