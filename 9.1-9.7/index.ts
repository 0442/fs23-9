import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());
const port = 3002;

app.get('/hello', (_req, res) => {
    res.status(200).send("Hello Full Stack!");
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }

    const bmi = calculateBmi(Number(height), Number(weight));

    return res.status(200).json({
        height,
        weight,
        bmi
    });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dailyExercises: any = req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const target: any = req.body.target;

    if (!dailyExercises || ! target) {
        return res.status(400).json({ error: 'parameters missing' });
    }

    if (!(dailyExercises instanceof Array) || dailyExercises.length < 1 || isNaN(Number(target))) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }

    for (const e of dailyExercises) {
        if (isNaN(Number(e))) {
            return res.status(400).json({ error: 'malformatted parameters' });
        }
    }

    return res.status(200).json(calculateExercises(Number(target), dailyExercises.map(e => Number(e))));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
