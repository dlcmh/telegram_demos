import express, { urlencoded } from 'express';
import 'express-async-errors';
import env from './env';
import { routes } from './routes';

const app = express();

// middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));

// routes
routes(app);

const { PORT } = env;
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
