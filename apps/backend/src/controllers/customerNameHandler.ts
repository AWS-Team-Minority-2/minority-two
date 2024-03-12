import { pool } from '@min-two/postgres-node';

type NameUpdate = {
  id: string;
  name: string;
};

const queryWithUpdate = (
  action: 'First' | 'Last',
  name: { firstName: string; lastName: string } | string,
  id: string
): string => {
  let sqlContent = '';
  switch (action) {
    case 'First':
      sqlContent = `
            UPDATE users.user
            SET firstname = '${name}'
            WHERE id = '${id}';`;
      break;
    case 'Last':
      sqlContent = `
            UPDATE users.user
            SET lastname = '${name}'
            WHERE id = '${id}';`;
      break;
  }

  return sqlContent;
};

export const updateCustomerFirstName = async (details: NameUpdate) => {
  const q = queryWithUpdate('First', details.name, details.id);
  const client = await pool.connect();

  try {
    await client.query(q);
    client.release();
    return;
  } catch (error) {
    // Handle the error appropriately, you can log it or throw a custom error
    throw new Error('Error updating name');
  }
};

export const updateCustomerLastName = async (details: NameUpdate) => {
  const q = queryWithUpdate('Last', details.name, details.id);
  const client = await pool.connect();

  try {
    await client.query(q);
    client.release();
    return;
  } catch (error) {
    // Handle the error appropriately, you can log it or throw a custom error
    throw new Error('Error updating name');
  }
};
