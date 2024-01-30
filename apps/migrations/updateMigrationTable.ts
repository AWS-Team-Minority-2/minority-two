import { pool } from '@min-two/postgres-node';

const updateMigrationTable = async (migrationName: string) => {
  try {
    const client = await pool.connect();
    const query = 'INSERT INTO public.migration (name) VALUES ($1)';
    const values = [migrationName];
    await client.query(query, values);
    client.release();
  } catch (error) {
    // Handle the error appropriately, you can log it or throw a custom error
    throw new Error('Error updating migration table');
  }
};

export { updateMigrationTable };
