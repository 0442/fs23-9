import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const port = 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);
app.get('/api/ping', (_req, res) => {
    return res.status(200).send('pong');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});