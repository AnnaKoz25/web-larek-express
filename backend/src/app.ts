import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import routerProducts from './routes/product';
import routerOrder from './routes/order';
import errorHandler from './middlewares/ErrorHandler';
import notFound from './middlewares/NotFound';
import requestLogger from './middlewares/requestLogger';
import errorLogger from './middlewares/errorLogger';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const DB_ADDRESS = process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/weblarek';

mongoose.connect(DB_ADDRESS);
app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

app.use('/product', routerProducts);
app.use('/order', routerOrder);
app.use(notFound);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server listens to port ${PORT}`);
});
