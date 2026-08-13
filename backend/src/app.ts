import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.text()); // for CSV import
app.use(requestLogger);
app.use('/api', routes);
app.use(errorHandler);

export default app;