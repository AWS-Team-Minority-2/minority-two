import { GQLContext } from '../GQLContext';
import { User } from '@min-two/user-iso';

export const MutationResolver = {
  async RegisterUser(_root: {}, args: { user: User }, context: GQLContext) {
    try {
      // Assuming fetchRestaurant is an asynchronous function that returns a list of restaurants
      const upload = context.users.resgister(args.user);
      return upload;
    } catch (error) {
      // Handle any potential errors here
      throw new Error('Failed to register user');
    }
  },
};
