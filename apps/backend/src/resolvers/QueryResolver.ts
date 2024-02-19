import { GQLContext } from '../GQLContext';

export const QueryResolver = {
  async getMinorityBusiness(_root: {}, args: {}, context: GQLContext) {
    try {
      const business = await context.business.getStores();
      return business;
    } catch (error) {
      console.error('Error fetching stores:', error);
      return [];
    }
  },
};
