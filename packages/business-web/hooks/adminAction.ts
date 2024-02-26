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

type SuspendCall = {
  id: string;
  adminName: string;
};

const sendSuspendRequest = async (data: SuspendCall) => {
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

const sendUnsuspendRequest = async (data: SuspendCall) => {
  try {
    const response = await fetch(
      'http://localhost:6002/admin/actions/unsuspend',
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
  const suspendBusiness = async (props: SuspendCall) => {
    const { id, adminName } = props;
    try {
      await sendSuspendRequest({
        id,
        adminName,
      });
    } catch (e) {
      console.log('error from admin actions');
    }
  };

  const unsuspendBusiness = async (props: SuspendCall) => {
    const { id, adminName } = props;
    try {
      await sendUnsuspendRequest({
        id,
        adminName,
      });
    } catch (e) {
      console.log('error from admin actions');
    }
  };

  return {
    suspend: suspendBusiness,
    unsuspend: unsuspendBusiness,
  };
}
