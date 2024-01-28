export class PostgresUserStore {
  pool;

  constructor(pool) {
    this.pool = pool;
  }

  async upsertNewUser(user) {
    try {
      const values = [user.id, user.name];
      this.pool.query(
        `INSERT INTO users.user (id, name) VALUES ($1, $2)`,
        values
      );
      return {
        message: 'Added User',
      };
    } catch (error) {
      console.log(error);
      throw new Error('Error while adding user to the database.');
    }
  }

  async getUsers() {
    try {
      const result = await this.pool.query(
        `SELECT * FROM features.featured_flag`
      );
      return result.rows;
    } catch (error) {
      console.log(error);
      throw new Error('Error while fetching users from the database.');
    }
  }
}
