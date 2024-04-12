import {
  QueryResolver,
  // SectionUnionResolver,
} from './src/resolvers/QueryResolver.js';
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
  updateCustomerLastName,
  updateCustomerPhoneNumber,
  updateCustomerEmail,
  queryStoreDataById,
} from './src/controllers';

const PATH = '/graphql';

export const getProjectServer = _.memoize(async () => {
  const typeDefs = readFileSync('./src/schema.graphql', 'utf8');

  const schema = mergeModulesSchemaWith({
    typeDefs,
    resolvers: {
      Query: QueryResolver,
      Mutation: MutationResolver,
      SectionUnion: {
        __resolveType: (section: any) => {
          if (section.type === 'shop') {
            return 'StoreItemSection';
          } else {
            return 'MenuSectionObject';
          }
        },
      },
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

node.post('/get/business/via/id', async (req, res) => {
  if (!req.body.id) {
    return res.status(400).send({ error: 'No data provided' });
  }
  try {
    const store = await queryStoreDataById(req.body.id);
    return res.status(200).send({ store: store });
  } catch (e) {
    return res.status(400).send({ error: 'Error getting store data' });
  }
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

  if (req.body.data.firstName) {
    await updateCustomerFirstName({
      name: req.body.data.firstName,
      id: req.body.id,
    });
  }

  if (req.body.data.lastName) {
    await updateCustomerLastName({
      name: req.body.data.lastName,
      id: req.body.id,
    });
  }

  return res.status(200).send({ message: 'Updated' });
});

node.post('/update/customer/number', async (req, res) => {
  if (!req.body.id || !req.body.data) {
    return res.status(400).send({ error: 'No data provided' });
  }

  await updateCustomerPhoneNumber({
    id: req.body.id,
    number: req.body.data,
  });

  return res.status(200).send({ message: 'Updated' });
});

node.post('/update/customer/email', async (req, res) => {
  if (!req.body.id || !req.body.data) {
    return res.status(400).send({ error: 'No data provided' });
  }

  await updateCustomerEmail({
    id: req.body.id,
    email: req.body.data,
  });

  return res.status(200).send({ message: 'Updated' });
});

createMinBusinessServer(node).then(() => {
  const PORT = 6002;
  node.listen(PORT);
  console.log('Apollo Server listening on port 6002/graphql 🚀');
});

export { node };
