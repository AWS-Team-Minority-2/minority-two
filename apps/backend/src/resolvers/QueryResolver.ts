import { GQLContext } from '../GQLContext';

export const QueryResolver = {
  async getMinorityBusiness(
    _root: {},
    args: { zip_code: string },
    context: GQLContext
  ) {
    try {
      // Filter Business within zip code
      const business = context.business.getStoresInRange(args.zip_code);
      return business;
    } catch (error) {
      console.error('Error fetching stores:', error);
      return [];
    }
  },
};
