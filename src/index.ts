import { startServer } from './server.js';
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 0;

startServer(PORT);
