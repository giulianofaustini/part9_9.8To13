import express from 'express';
const app = express();
import cors , { CorsOptions }from 'cors';

const corsOptions: CorsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));


import diaryRouter from './routes/diaries';
app.use(express.json());


const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});



app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
