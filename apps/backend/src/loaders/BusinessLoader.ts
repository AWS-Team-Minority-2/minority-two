import { PostgresBusinessStore } from '../stores/PostgresBuesinessStore';
import { GetLatLngByAddress } from '@geocoder-free/google';

type Distance = {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
};
export class BusinessLoader {
  private store: PostgresBusinessStore;

  constructor(store: PostgresBusinessStore) {
    this.store = store;
  }

  getStores = async (): Promise<any> => {
    try {
      return await this.store.getStores();
    } catch (error) {
      throw new Error('Failed to get stores');
    }
  };

  deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  isWithinRadius = (miles: number) => {
    return miles <= 5; // Checking if the distance is less than or equal to 5 miles
  };

  calculateDistance = (distance: Distance) => {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(distance.lat2 - distance.lat1);
    const dLon = this.deg2rad(distance.lon2 - distance.lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(distance.lat1)) *
        Math.cos(this.deg2rad(distance.lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    const miles = d * 0.621371; // Convert distance to miles
    return { inRange: this.isWithinRadius(miles), distance: miles };
  };

  getStoresInRange = async (zipCode: string): Promise<any> => {
    try {
      // If we don't have a zipCode, we will assume the store is online and will render it out.
      const inRangeStores: any[] = [];
      const stores = await this.getStores();
      const logLat = await GetLatLngByAddress(zipCode);

      for (const business of stores) {
        if (logLat[0] && logLat[1] && business.is_online === false) {
          // Calculate distance
          const { inRange, distance }: any = this.calculateDistance({
            lat1: logLat[0],
            lon1: logLat[1],
            lat2: business.lat,
            lon2: business.long,
          });

          if (inRange) {
            business.distance = distance.toFixed(2);
            inRangeStores.push(business);
          }
        }
      }

      for (const business of stores) {
        if (business.is_online !== false) {
          inRangeStores.push(business);
        }
      }

      return inRangeStores;
    } catch (error) {
      throw new Error('Error occurred while getting stores in range');
    }
  };
}
