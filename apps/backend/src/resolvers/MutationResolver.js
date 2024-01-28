export const MutationResolver = {
  async addUser(_root, args, context) {
    try {
      const users = context.user.upsert(args.userPassed);

      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return []; // Return an empty array or handle the error appropriately
    }
  },
};
