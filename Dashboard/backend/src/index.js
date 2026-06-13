import express from 'express';
import 'dotenv/config';
import AnimalsRouter from './routes/animals.js';
import cors from 'cors';

// create the express app

const app = express();

// enable CORS and JSON parsing middleware, and set up routes
app.use(cors());
app.use(express.json());
app.use('/api', AnimalsRouter);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the Grazioso Salvare Animal Shelter API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
