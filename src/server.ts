import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { sequelize } from './database/index.js';
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';
import { buildContext, Context } from './context.js';
import 'dotenv/config';

const allowedOrigins = ['http://localhost:3000', 'https://studio.apollographql.com'];

export async function startServer() {
  await sequelize.sync();
  console.log('Database synced');

  const app = express();
  app.use(cors({ origin: allowedOrigins, credentials: true }));
  app.use(express.json());

  const server = new ApolloServer<Context>({ typeDefs, resolvers });
  await server.start();

  app.use('/graphql', expressMiddleware<Context>(server, { context: buildContext }));
  app.get('/health', (_req, res) => res.status(200).send({ status: 'ok' }));

  const PORT = parseInt(process.env.PORT || '3000', 10);
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  });
}
