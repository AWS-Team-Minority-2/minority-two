import { BusinessLoader } from './loaders/BusinessLoader';
import { UserLoader } from './loaders/UserLoader';
export interface GQLContext {
  users: UserLoader;
  business: BusinessLoader;
}
