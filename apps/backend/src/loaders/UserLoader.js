export class UserLoader {
  constructor(store) {}

  upsert = async (user) => {
    try {
      return this.store.upsertNewUser(user);
    } catch (error) {
      console.error('Error uploading user data', error);
      return [];
    }
  };

  fetchUsers = async () => {
    try {
      const users = await this.store.getUsers();
      return users;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return [];
    }
  };
}
