import { pool } from '@min-two/postgres-node';

type EmailUpdate = {
  id: string;
  email: string;
};

const queryWithUpdate = (details: EmailUpdate): string => {
  return `
            UPDATE users.user
            SET email = '${details.email}'
            WHERE id = '${details.id}';`;
};

export const updateCustomerEmail = async (details: EmailUpdate) => {
  const q = queryWithUpdate(details);
  const client = await pool.connect();

  try {
    await client.query(q);
    client.release();
    return;
  } catch (error) {
    // Handle the error appropriately, you can log it or throw a custom error
    throw new Error('Error updating email');
  }
};
