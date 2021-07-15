import express from 'express';
import dotenv from 'dotenv';
import connectDb from './controllers/db';

dotenv.config({ path: './config/config.env' });

connectDb();

const app = express();

app.use(express.json());
app.use('/', require('./routes/image.routes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT} port`);
});
