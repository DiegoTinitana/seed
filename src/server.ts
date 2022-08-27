import express, { Express } from 'express';
import { connectDB } from './db/connect';
import { handleErrors } from './middlewares/errors.middlewares';
import router from './router';

const app: Express = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use('/api', router);
app.use(handleErrors);

app.listen(port, async () => {
  await connectDB();
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
