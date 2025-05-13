import express, { Request, Response } from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';
import cors from 'cors';

const allowedOrigins = [
  'http://localhost:3000', // Local frontend
  'https://studio.apollographql.com', // Apollo Sandbox
  // Add your production frontend domain here when available
];

const app = express();
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

const server = new ApolloServer({ typeDefs, resolvers });

await server.start();

app.use('/graphql', expressMiddleware(server, { context: async ({ req }) => ({}) }));

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).send({ status: 'ok' });
});

const PORT = parseInt(process.env.PORT || '3000', 10);

app.listen(PORT, (): void => {
  console.log(`Server running on http://localhost:${PORT}`);
});
