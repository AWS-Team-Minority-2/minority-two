import { pool } from '@min-two/postgres-node';

type NumberUpdate = {
  id: string;
  number: string;
};

const queryWithUpdate = (details: NumberUpdate): string => {
  return `
            UPDATE users.user
            SET phonenumber = '${details.number}'
            WHERE id = '${details.id}';`;
};

export const updateCustomerPhoneNumber = async (details: NumberUpdate) => {
  const q = queryWithUpdate(details);
  const client = await pool.connect();

  try {
    await client.query(q);
    client.release();
    return;
  } catch (error) {
    // Handle the error appropriately, you can log it or throw a custom error
    throw new Error('Error updating number');
  }
};
