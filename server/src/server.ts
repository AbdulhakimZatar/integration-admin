import express from 'express';
import cors from 'cors';
import routes from './routes';
import notFoundHandler from './middleware/notFoundHandler';
import errorHandler from './middleware/errorHandler';
import { PORT } from './configs/env';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1', routes);

app.use('*', notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.info(`Server is listening on port ${PORT}`);
});
