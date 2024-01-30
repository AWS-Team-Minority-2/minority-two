import { pool } from '@min-two/postgres-node';

import { QueryResult } from 'pg';

interface MigrationRow {
  name: string;
}

const getAppliedMigrations = async (): Promise<string[]> => {
  const checkInit: string = `
    SELECT EXISTS (
      SELECT 1
      FROM   information_schema.tables 
      WHERE  table_schema = 'public'
      AND    table_name = 'migration'
    );
  `;

  const client = await pool.connect();

  try {
    const results: QueryResult = await client.query(checkInit);
    const doesExist: boolean = results.rows[0].exists;

    if (!doesExist) {
      return [];
    }

    const query: string = `SELECT name FROM public.migration`;
    const namesResult: QueryResult<MigrationRow> = await client.query(query);

    const listOfNames: string[] = namesResult.rows.map((row) => row.name);

    return listOfNames;
  } catch (error) {
    // Handle the error appropriately, you can log it or throw a custom error
    throw new Error('Error getting migrations');
  } finally {
    client.release();
  }
};

export { getAppliedMigrations };
