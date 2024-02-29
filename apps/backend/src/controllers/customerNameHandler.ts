import { pool } from '@min-two/postgres-node';

type NameUpdate = {
  id: string;
  name: string;
};

export const updateCustomerFirstName = async (details: NameUpdate) => {
  console.log(details.id, 'from controleler');
};
