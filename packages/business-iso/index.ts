export interface BusinessBase {
  city: string;
  cover_image: string;
  is_online: boolean;
  lat: string;
  long: string;
  name: string;
  type: 'restaurant' | 'service' | 'shop';
  is_featured: boolean;
  state: string;
  zip_code: number;
  is_pending: boolean;
  sid: string;
  profile_image: string;
  rating: string;
  rating_count: number;
  distance: string;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  outOfStock: boolean;
}

export interface MenuSection {
  name: string;
  dishes: Dish[];
}

export interface Restaurant extends BusinessBase {
  type: 'restaurant'; // Override type to be 'restaurant'
  menuSections?: MenuSection[]; // Add dishes property
}
