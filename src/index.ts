import express, { Request, Response } from 'express';
import 'dotenv/config';

const app = express();

app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).send({ status: 'ok' });
});

const PORT = parseInt(process.env.PORT || '3000', 10);

app.listen(PORT, (): void => {
  console.log(`Server running on http://localhost:${PORT}`);
});
