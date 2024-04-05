import { Dish, RestaurantProvider } from '@min-two/business-iso';

export type Cart = {
  restaurant: RestaurantProvider;
  items: Dish[];
};
