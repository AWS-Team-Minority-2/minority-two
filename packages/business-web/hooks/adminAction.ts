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

export function adminActions() {
  return {};
}
