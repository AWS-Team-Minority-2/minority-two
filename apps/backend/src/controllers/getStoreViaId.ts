import { pool } from '@min-two/postgres-node';

const queryStoreData = (id: string): string => {
  return `
  SELECT * FROM stores.store WHERE sid = '${id}';
          `;
};

export const queryStoreDataById = async (id: string) => {
  const q = queryStoreData(id);
  const client = await pool.connect();

  try {
    const result = await client.query(q);
    client.release();
    return result.rows[0];
  } catch (error) {
    throw new Error('Error getting store data');
  }
};
