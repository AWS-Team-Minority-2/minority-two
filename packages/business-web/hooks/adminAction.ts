import { useEffect, useState, useCallback } from 'react';

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
  } catch (error) {
    throw new error();
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
  };

  return {
    suspend: suspendBusiness,
  };
}
