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

export interface StoreItem {
  id: string;
  name: string;
  size?: string;
  price: number;
  imageUrl: string;
  outOfStock: boolean;
}

interface StoreItemSection {
  name: string;
  items: StoreItem[];
}

type Sections = MenuSection | StoreItemSection;

interface Section {
  type: BusinessType;
  sections: Sections[];
}

interface RestaurantSection extends Section {
  type: 'restaurant';
  sections: MenuSection[];
}

export interface Restaurant extends BusinessBase {
  type: 'restaurant'; // Override type to be 'restaurant'
  section: RestaurantSection; // Add dishes property
}

interface StoreSection extends Section {
  type: 'shop';
  sections: StoreItemSection[];
}

export interface ShoppingStore extends BusinessBase {
  type: 'shop'; // Override type to be 'restaurant'
  section: StoreSection;
}
// Use for state management only
export interface BusinessProvider {
  name: string;
  coverImage: string;
  rating: number;
  ratingCount: number;
  distance: number;
  profileImage: string;
  sections?: any;
  id: string;
}

export type CartItemState = Dish[] | StoreItem[];
export type CartItem = Dish | StoreItem;
