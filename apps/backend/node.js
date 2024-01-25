import { QueryResolver } from './src/resolvers/QueryResolver.js';
import { MutationResolver } from './src/resolvers/MutationResolver.js';

// // User Loader and Store
import { UserLoader } from './src/loaders/UserLoader.js';
import { PostgresUserStore } from './src/stores/PostgresUserStore.js';
import { mergeModulesSchemaWith, pool as pg } from '@min-two/postgres-node';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { readFileSync } from 'fs';
import _ from 'lodash';

const PATH = '/graphql';

export const getProjectServer = _.memoize(async () => {
  const typeDefs = readFileSync('./src/schema.graphql', 'utf8');

  const schema = mergeModulesSchemaWith({
    typeDefs,
    resolvers: {
      Query: QueryResolver,
      Mutation: MutationResolver,
    },
  });
  const server = new ApolloServer({
    schema,
    context: () => {
      const postgresUserStore = new PostgresUserStore(pg);
      const users = new FeaturedFlagInstance(postgresUserStore);
      return {
        users,
      };
    },
  });

  await server.start();

  return server;
});

export async function createMinBusinessServer(app) {
  const apolloServer = await getProjectServer();
  apolloServer.applyMiddleware({
    app,
    path: PATH,
  });
}

const node = express();

node.get('/', async (req, res) => {
  return res.status(200).send({ message: 'Port opended, see /graphql' });
});

createMinBusinessServer(node).then(() => {
  const PORT = 6002;
  node.listen(PORT);
  console.log('Apollo Server listening on port 6002/graphql 🚀');
});

export { node };
