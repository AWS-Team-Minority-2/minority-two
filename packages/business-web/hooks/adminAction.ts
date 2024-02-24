import { useEffect, useState, useCallback } from 'react';
// import { useQuery } from '@apollo/client';
// import { GET_STORES } from '../mutations/index';

/* Hook that handles admin actions **/

// TODO: move to iso if necessary

interface Store {
  city: string;
  cover_image: string;
  is_online: boolean;
  lat: string;
  long: string;
  name: string;
  render_type: 'featured' | 'restaurant' | 'service' | 'shop';
  state: string;
  zip_code: number;
  is_pending: boolean;
}

type TableName = 'store';

interface MigrationActions {
  tableName: TableName;
  action: string;
}

function getNextMigrationFileName(actions: MigrationActions) {
  return `admin_${actions.action}_${actions.tableName}.sql`;
}

function createMigration(actions: MigrationActions) {
  const migrationName = getNextMigrationFileName(actions);
  const migrationContent = `-- Migration for ${actions.action} action on table ${actions.tableName}\n\n`;

  // // Create the migration file in the SQL directory
  // const migrationPath = `./sql/${migrationName}`;
  // fs.writeFileSync(migrationPath, migrationContent);

  // // Execute the migration using your migration runner (assuming it's a shell command)
  // const migrationCommand = `your_migration_runner_command --file ${migrationPath}`;
  // exec(migrationCommand, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`Error executing migration: ${error.message}`);
  //     return;
  //   }
  //   if (stderr) {
  //     console.error(`Migration stderr: ${stderr}`);
  //     return;
  //   }
  //   console.log(`Migration stdout: ${stdout}`);
  // });
}

export function adminActions() {
  const suspendBusiness = () => {
    console.log('Hello');
  };
  return {
    suspend: suspendBusiness,
  };
}
