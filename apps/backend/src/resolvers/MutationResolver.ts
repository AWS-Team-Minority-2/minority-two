import { GQLContext } from '../GQLContext';
import { NotificationBase, User, UserDetails } from '@min-two/user-iso';

export const MutationResolver = {
  async RegisterUser(_root: {}, args: { user: User }, context: GQLContext) {
    try {
      const upload = context.users.resgister(args.user);
      return upload;
    } catch (error) {
      throw new Error('Failed to register user');
    }
  },

  async LoginUser(
    _root: {},
    args: { details: UserDetails },
    context: GQLContext
  ) {
    try {
      const attempt = context.users.login(args.details);
      return attempt;
    } catch (error) {
      // Handle any potential errors here
      throw new Error('Failed to login');
    }
  },

  async LoginAdmin(
    _root: {},
    args: { adminCode: string },
    context: GQLContext
  ) {
    try {
      const attempt = await context.admin.login(args.adminCode);
      return attempt;
    } catch (error) {
      throw new Error('Failed to login');
    }
  },

  async UploadNotification(
    _root: {},
    // @ts-ignore
    args,
    context: GQLContext
  ) {
    try {
      console.log(args, 'hhhh');
    } catch (error) {
      throw new Error('Failed to login');
    }
  },
};
