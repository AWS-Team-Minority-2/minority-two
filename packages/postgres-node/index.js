import pkg from 'pg';
import { mergeSchemas } from '@graphql-tools/schema';

const getPostgresPool = () => {
  const { Pool } = pkg;
  const pool = new Pool({
    user: '',
    host: 'localhost',
    database: 'nexa',
    password: '',
    port: 5000, // Default PostgreSQL port is 5432
  });
  return pool;
};

const pool = getPostgresPool();
export { pool };

export function mergeModulesSchemaWith(mergeIn) {
  return mergeSchemas({
    ...mergeIn,
  });
}
