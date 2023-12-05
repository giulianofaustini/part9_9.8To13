import express from 'express';
const app = express();
app.use(express.json());

import allDiagnosesRouter from './routes/allDiagnoses';

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});


app.use('/api/diagnoses', allDiagnosesRouter );

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});