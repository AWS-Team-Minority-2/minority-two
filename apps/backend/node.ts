import { QueryResolver } from './src/resolvers/QueryResolver.js';
import { MutationResolver } from './src/resolvers/MutationResolver.js';

// User Loader and Store
import { UserLoader } from './src/loaders/UserLoader';
import { PostgresUserStore } from './src/stores/PostgresUserStore';
import { mergeModulesSchemaWith, pool as pg } from '@min-two/postgres-node';

import express, { Application } from 'express';

import { ApolloServer } from 'apollo-server-express';
import { readFileSync } from 'fs';
import _ from 'lodash';
import { GQLContext } from './src/GQLContext.js';
import { BusinessLoader } from './src/loaders/BusinessLoader.js';
import { PostgresBusinessStore } from './src/stores/PostgresBuesinessStore.js';
import { PostgresAdminStore } from './src/stores/PostgresAdminStore.js';
import { AdminLoader } from './src/loaders/AdminLoader.js';
import bodyParser from 'body-parser';
import {
  handleSuspendBusiness,
  handleUnsuspendBusiness,
  updateCustomerFirstName,
} from './src/controllers';

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
    context: (): GQLContext => {
      const postgresUserStore = new PostgresUserStore(pg);
      const postgresBusinessStore = new PostgresBusinessStore(pg);
      const postgresAdminStore = new PostgresAdminStore(pg);
      const users = new UserLoader(postgresUserStore);
      const business = new BusinessLoader(postgresBusinessStore);
      const admin = new AdminLoader(postgresAdminStore);
      return {
        users,
        business,
        admin,
      };
    },
  });

  await server.start();

  return server;
});

export async function createMinBusinessServer(app: any) {
  const apolloServer = await getProjectServer();
  apolloServer.applyMiddleware({
    app,
    path: PATH,
  });
}

const node = express();
node.use(bodyParser.json({ limit: '30mb' }));
node.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

node.get('/', async (req, res) => {
  return res.status(200).send({ message: 'Port opended, see /graphql' });
});

node.post('/admin/actions/suspend', async (req, res) => {
  if (!req.body.id) {
    return res.status(400).send({ error: 'No data provided' });
  }
  try {
    await handleSuspendBusiness({
      id: req.body.id,
      adminName: req.body.adminName,
      action: 'suspend',
    });
  } catch (e) {
    return res.status(400).send({ error: 'Error suspending user' });
  }

  res.status(200).send({ message: 'Business Suspended' });
  return;
});

node.post('/admin/actions/unsuspend', async (req, res) => {
  if (!req.body.id) {
    return res.status(400).send({ error: 'No data provided' });
  }
  try {
    await handleUnsuspendBusiness({
      id: req.body.id,
      adminName: req.body.adminName,
      action: 'unsuspend',
    });
  } catch (e) {
    return res.status(400).send({ error: 'Error suspending user' });
  }

  res.status(200).send({ message: 'Business unsuspend' });
  return;
});

node.post('/update/customer/names', async (req, res) => {
  if (!req.body.id) {
    return res.status(400).send({ error: 'No data provided' });
  }

  if (req.body.firstName) {
    await updateCustomerFirstName({
      name: req.body.firstName,
      id: req.body.id,
    });
  }

  // controller for updating fisrtName

  // controller for updating lastName

  // console.log(req.body.id);
});

createMinBusinessServer(node).then(() => {
  const PORT = 6002;
  node.listen(PORT);
  console.log('Apollo Server listening on port 6002/graphql 🚀');
});

export { node };
