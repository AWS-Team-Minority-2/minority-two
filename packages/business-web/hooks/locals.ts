import { BusinessProvider, CartItemState } from '@min-two/business-iso';

export type Cart = {
  business: BusinessProvider;
  items: CartItemState;
};
