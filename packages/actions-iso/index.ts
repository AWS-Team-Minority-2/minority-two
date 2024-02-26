import { pool } from '@min-two/postgres-node';

export type SuspendActionType = 'suspend' | 'unsuspend';

export type SuspendAction = {
  id: string;
  adminName: string;
  action: SuspendActionType;
};

export const runMigration = async (migration: string) => {
  try {
    const client = await pool.connect();

    await client.query(migration);
    client.release();
  } catch (error) {
    // Handle the error appropriately, you can log it or throw a custom error
    console.log(error);
    throw new Error('Error updating migration table');
  }
};

export const updateMigrationTable = async (name: string) => {
  try {
    const client = await pool.connect();
    const query = 'INSERT INTO public.migration (name) VALUES ($1)';
    const values = [name];
    await client.query(query, values);
    client.release();
  } catch (error) {
    // Handle the error appropriately, you can log it or throw a custom error
    throw new Error('Error updating migration table');
  }
};
