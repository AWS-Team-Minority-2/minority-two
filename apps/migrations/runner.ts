import * as fs from 'fs';
import * as path from 'path';
import { pool } from '@min-two/postgres-node';
import { updateMigrationTable } from './updateMigrationTable';
import { getAppliedMigrations } from './getAppliedMigrations';

const appliedMigrations = await getAppliedMigrations();

console.log(appliedMigrations);

// // Function to run a single migration file
async function runMigration(fileName: string): Promise<void> {
  const client = await pool.connect();
  // Use import.meta.url to get the current module's URL
  const currentModuleUrl = import.meta.url;
  //   // Use new URL() to extract the directory name
  const currentDir = path.dirname(new URL(currentModuleUrl).pathname);
  const filePath = path.join(currentDir, '/sql', fileName);
  const sql = fs.readFileSync(filePath, 'utf-8');
  //   // Uncomment the following block to run the migration
  try {
    await client.query(sql);
    await updateMigrationTable(fileName);
    console.log(`Migration ${fileName} applied successfully.`);
  } catch (error) {
    console.error(`Error applying migration ${fileName}:`, error);
  } finally {
    client.release(); // Release the client back to the pool
  }
}
// // Function to run all migrations in the SQL directory
async function runMigrations(): Promise<void> {
  // Use import.meta.url to get the current module's URL
  const currentModuleUrl = import.meta.url;
  // Use new URL() to extract the directory name
  const currentDir = path.dirname(new URL(currentModuleUrl).pathname);
  const sqlDir = path.join(currentDir, '/sql');

  console.log(sqlDir);

  try {
    // Read the list of files in the SQL directory
    const files = fs.readdirSync(sqlDir);
    // Run migrations for each file
    for (const file of files) {
      if (file.endsWith('.sql') && !appliedMigrations.includes(file)) {
        await runMigration(file);
      } else {
      }
    }
    const skippedMigrations = appliedMigrations.length;
    if (skippedMigrations) {
      console.log('✅ Some Migrations skipped (see docs)');
    }
    console.log('✅ All migrations applied successfully.');
  } catch (error) {
    console.error('🔴 Error running migrations:', error);
  }
  pool.end();
}

runMigrations();
