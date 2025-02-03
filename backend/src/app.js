import cors from 'cors';
import express from 'express';
import routes from './app/routes/index.js';
import notFound from './app/middlewares/notFound.js';

const app = express();

//parsers
app.use(express.json());

app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Server is running!');
});

//Not Found
app.use(notFound);

export default app;
