type BusinessType = 'restaurant' | 'service' | 'shop';

export interface BusinessBase {
  city: string;
  cover_image: string;
  is_online: boolean;
  lat: string;
  long: string;
  name: string;
  type: BusinessType;
  is_featured: boolean;
  state: string;
  zip_code: number;
  is_pending: boolean;
  sid: string;
  profile_image: string;
  rating: string;
  rating_count: number;
  distance: string;
  section: Section;
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

interface MenuSection {
  name: string;
  dishes: Dish[];
}

interface Section {
  type: BusinessType;
  sections: MenuSection[];
}

interface RestaurantSection extends Section {
  type: 'restaurant';
}

export interface Restaurant extends BusinessBase {
  type: 'restaurant'; // Override type to be 'restaurant'
  section: RestaurantSection; // Add dishes property
}
