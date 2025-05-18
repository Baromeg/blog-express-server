import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { sequelize } from './database/index.js';
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';
import { buildContext, GraphQLContext } from './context.js';
import 'dotenv/config';
import http from 'http';
import { AddressInfo } from 'net';

const allowedOrigins = ['http://localhost:3000', 'https://studio.apollographql.com'];

export async function startServer(port = 3000): Promise<http.Server> {
  await sequelize.sync();
  console.log('Database synced');

  const app = express();
  app.use(cors({ origin: allowedOrigins, credentials: true }));
  app.use(express.json());

  const apolloServer = new ApolloServer<GraphQLContext>({ typeDefs, resolvers });
  await apolloServer.start();

  app.use('/graphql', expressMiddleware<GraphQLContext>(apolloServer, { context: buildContext }));
  app.get('/health', (_req, res) => res.status(200).send({ status: 'ok' }));

  return new Promise((resolve) => {
    const listener = app.listen(port, () => {
      console.log(`Server listening on ${(listener.address() as AddressInfo).port}`);
      resolve(listener);
    });
  });
}
