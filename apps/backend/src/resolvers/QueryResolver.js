export const QueryResolver = {
  async getUsers(_root, args, context) {
    try {
      // Assuming fetchRestaurant is an asynchronous function that returns a list of restaurants
      const flagsFetched = context.flags.fetchFlags();

      return flagsFetched;
    } catch (error) {
      // Handle any potential errors here
      console.error('Error fetching flags:', error);
      return []; // Return an empty array or handle the error appropriately
    }
  },
};
