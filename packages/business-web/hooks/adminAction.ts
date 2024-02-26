import { useEffect, useState, useCallback } from 'react';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

// import { useQuery } from '@apollo/client';
// import { GET_STORES } from '../mutations/index';

/* Hook that handles admin actions **/

export interface Store {
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

export type TableName = 'stores.store';

export type StoreId = string;

export type Suspend = { id: StoreId; adminName: string };

// interface MigrationActions {
//   tableName: TableName;
//   action: string;
//   data: { id: StoreId; adminName: string };
// }

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

const sendSuspendRequest = async (data: Suspend) => {
  try {
    const response = await fetch(
      'http://localhost:6002/admin/actions/suspend',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      alert('Error suspending business.');
    }
    // const data = await response.json();
    // console.log('Response data:', data);
    // Handle successful response
    // alert('Success');
  } catch (error) {
    console.error('Error:', error);
    // alert('Error');
  }
};

export function adminActions() {
  const suspendBusiness = async (props: Suspend) => {
    const { id, adminName } = props;
    try {
      await sendSuspendRequest({
        id,
        adminName,
      });
    } catch (e) {
      console.log('error froma dminn');
    }

    // const migrationDirectory = './sql';

    // console.log(fs.existsSync(migrationDirectory));

    // const migrationData = createMigration({
    //   action: 'suspend',
    //   tableName: 'stores.store',
    //   data: { id, adminName },
    // });

    // const dirInfo = await FileSystem.getInfoAsync(
    //   '../../../apps/migrations/sql'
    // );

    // async function getCurrentDirectory() {
    //   try {
    //     const asset = Asset.fromModule(require('../../../apps/migrations/sql'));
    //     await asset.downloadAsync(); // Ensures the asset is downloaded (if it's remote)

    //     console.log('Current directory:', asset.localUri || asset.uri);
    //   } catch (error) {
    //     console.error('Error getting current directory:', error);
    //   }
    // }
    //
    // getCurrentDirectory();
  };

  return {
    suspend: suspendBusiness,
  };
}
